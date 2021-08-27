import {assert, BuildContext, entries, File, FileArtifactList, FileList, logger} from "@reform/bundle";
import {ApplicationDocument} from "../html/ApplicationDocument";
import {Metafile} from "esbuild";
import {join, relative, resolve} from "path";

export class DocFile extends File<string> {
    readonly #context: BuildContext;
    readonly #entries: string[] = [];
    readonly #artifacts: FileList;
    readonly #cache = new Map<string, string>();

    constructor(context: BuildContext, file: File<string>) {
        super(file.config, file.contents);

        this.#context = context;
        this.#artifacts = new FileArtifactList(this.#context);
    }

    public get code() {
        return this.#entries
            .map((entry) => `import "./${relative(this.dir, join(this.dir, entry))}";`)
            .join("\n");
    }

    public get watchFiles() {
        const {base} = this.#context;

        return this.#entries.map((file) => base.resolve(file));
    }

    public static async parse(context: BuildContext, relative: string): Promise<DocFile> {
        const {base: {path: prefix}} = context;
        const file = await File.read({prefix, relative}, "utf-8");
        const docFile = new this(context, file);

        return docFile.parse();
    }

    public async parse() {
        const document = new ApplicationDocument(this.contents);
        this.#entries.push(...document.getEntries());

        for (const [file] of document.getArtifacts()) {
            this.#artifacts.add(this.getArtifactRelativePath(file));
        }

        this.#context.cache.on(this.relative, (event) => {
            if (event === "change") {
                this.build();
            }
        });

        return this;
    }

    private getArtifactRelativePath(file: string) {
        const {base} = this.#context;
        const path = resolve(this.dir, file);

        return base.getRelativePath(path);
    }

    public async build(metafile?: Metafile) {
        const {relative} = this;
        const {build: {path: prefix}, publicPath, args} = this.#context;
        const dest = File.factory({prefix, relative});
        const document = new ApplicationDocument(this.contents);

        const entry = await this.getEntryFile(metafile);
        assert(entry, `Can't find entry of ${this.relative}`);

        logger.info(this, "build -> %s?%s", entry.relative, entry.getHash());

        await this.#artifacts.build();
        for (const [file, node] of document.getArtifacts()) {
            const relative = this.getArtifactRelativePath(file);
            const dest = this.#artifacts.getBuilt(relative);
            node.value = `${publicPath}/${file}?${dest.getHash()}`;
        }

        const contents = document.build(entry, publicPath, this.#context.format, args.isDevelopment);

        await Promise.all([
            this.#artifacts.build(),
            dest.write(contents),
        ]);
    }

    private getEntryFile(metafile?: Metafile) {
        const {base: {relative: src}, build: {relative: build}} = this.#context;

        for (const [file, value] of entries(metafile?.outputs)) {
            const entryPoint = join(src, this.relative);
            if (typeof file === "string" && value.entryPoint === entryPoint) {
                return File.read({prefix: build, relative: relative(build, file)});
            }
        }
    }
}
