import {assert, BuildContext, entries, File, FileArtifactList, FileList, logger} from "@reform/bundle";
import {Metafile} from "esbuild";
import {join, relative, resolve} from "path";

import {ApplicationDocument} from "../html/ApplicationDocument.js";
import {Attachable, AttachFileType} from "../interface.js";
import {createHash} from "crypto";
import {readFileSync, readSync} from "fs";

export class DocFile extends File<string> {
    readonly #context: BuildContext;

    readonly #entries: string[] = [];

    readonly #artifacts: FileList;

    readonly #attachType: AttachFileType[];

    readonly #artifactsFilter?: RegExp;

    constructor(context: BuildContext, file: File<string>, attach: AttachFileType[] = [], artifacts?: string) {
        super(file.config, file.contents);

        this.#context = context;
        this.#attachType = attach;
        this.#artifacts = new FileArtifactList(this.#context);
        if (artifacts) {
            this.#artifactsFilter = new RegExp(artifacts);
        }
    }

    public get code() {
        return this.#entries.map((entry) => `import "./${relative(this.dir, join(this.dir, entry))}";`).join("\n");
    }

    public get watchFiles() {
        const {base} = this.#context;

        return [this.path, ...this.#entries.map((file) => base.resolve(file))];
    }

    public static async parse(
        context: BuildContext,
        relative: string,
        attach: AttachFileType[] = [],
        artifacts?: string,
    ): Promise<DocFile> {
        const {
            base: {path: prefix},
        } = context;
        const file = await File.read({prefix, relative}, "utf-8");
        const docFile = new this(context, file, attach, artifacts);

        return docFile.parse();
    }

    public async parse() {
        const document = new ApplicationDocument(this.contents);
        const entries = document.getEntries().map((entry) => join(this.#context.base.getRelativePath(this.dir), entry));

        this.#entries.push(...entries);

        for (const [file] of document.getArtifacts(this.#artifactsFilter)) {
            this.#artifacts.add(this.getArtifactRelativePath(file));
        }

        return this;
    }

    private getArtifactRelativePath(file: string) {
        const {base} = this.#context;
        const path = resolve(this.dir, file);

        return base.getRelativePath(path);
    }

    private getBuildRelativePath(file: string) {
        const {build} = this.#context;
        const path = resolve(build.prefix, file);

        return build.getRelativePath(path);
    }

    public async build(metafile?: Metafile) {
        const {relative} = this;
        const {
            build: {path: prefix},
            publicPath,
            args,
        } = this.#context;
        const dest = File.factory({prefix, relative});
        const document = new ApplicationDocument(this.contents);

        const entry = await this.getEntryFile(metafile);
        assert(entry, `Can't find entry of ${this.relative}`);

        logger.info(this, "entry -> %s", entry.relative);

        await this.#artifacts.build();
        for (const [file, node] of document.getArtifacts(this.#artifactsFilter)) {
            logger.info(this, "push -> %s", file);
            const relative = this.getArtifactRelativePath(file);
            const dest = this.#artifacts.getBuilt(relative);
            node.value = `${publicPath}/${file}?${dest.getHash()}`;
        }

        const {outputs = {}} = metafile ?? {};
        const files = Object.keys(outputs).map((file) => file);

        const attachable: Attachable = {};
        for (const type of this.#attachType) {
            if (type === "stylesheet") {
                const stylesheet = files.filter((file) => file.endsWith(".css"));
                if (stylesheet.length > 0) {
                    const stylesheetList = [];
                    for (const file of stylesheet) {
                        logger.info(this, "push -> %s", file);
                        const uri = this.getBuildRelativePath(file);
                        const realPath = resolve(this.#context.build.prefix, file);
                        const hash = createHash("sha256")
                            .update(readFileSync(realPath))
                            .digest()
                            .toString("hex")
                            .slice(0, 4);

                        stylesheetList.push({uri, hash});
                    }

                    attachable.stylesheet = stylesheetList;
                }
            }
        }

        const contents = document.build(entry, attachable, publicPath, this.#context.format, args.isDevelopment);

        await Promise.all([this.#artifacts.build(), dest.write(contents)]);
    }

    private getEntryFile(metafile?: Metafile) {
        const {
            base: {relative: src},
            build: {relative: build},
        } = this.#context;

        for (const [file, value] of entries(metafile?.outputs ?? {})) {
            const entryPoint = join(src, this.relative);
            if (typeof value.entryPoint === "string" && value.entryPoint === entryPoint) {
                return File.read({prefix: build, relative: relative(build, file)});
            }
        }
    }
}
