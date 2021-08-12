import {mkdir, readFile, writeFile} from "fs/promises";
import glob from "glob";
import {dirname, join} from "path";
import logger from "../../internal/logger";
import {BuildContext} from "../BuildContext";
import {IBundleScriptConfig} from "../interfaces";

export class FileList {
    readonly #paths = new Set<string>();
    readonly #files = new Map<string, string>();
    readonly #context: BuildContext;
    readonly #config: IBundleScriptConfig;

    constructor(context: BuildContext, config: IBundleScriptConfig) {
        this.#context = context;
        this.#config = config;
        this.update();

        if (this.#context.watch) {
            this.watch();
        }
    }

    public get id() {
        return this.#context.id;
    }

    public get files() {
        return [...this.#files.keys()];
    }

    protected get readableFileList() {
        return this.files.map((file) => this.#context.getRelativePath(file));
    }

    public async copy() {
        logger.info(this, "copy -> %o", this.readableFileList);

        const ops = [];
        for (const [source, dest] of this.#files.entries()) {
            ops.push(this.copyFile(source, dest));
        }

        await Promise.all(ops);
    }

    public async copyFile(source: string, dest: string) {
        const {cache} = this.#context;
        if (cache.has(source)) {
            return;
        }

        await cache.store(source, async () => {
            const [, contents] = await Promise.all([
                mkdir(dirname(dest), {recursive: true}),
                readFile(source),
            ]);

            await writeFile(dest, contents);

            return contents;
        });
    }

    protected watch() {
        const {cache} = this.#context;
        cache.on((file, event) => {
            if (this.#files.has(file)) {
                logger.debug(this, "%s -> %s", this.#context.getRelativePath(file), event);
                this.update();
            }

            if (this.#paths.has(dirname(file)) && event === "add") {
                logger.debug(this, "add -> %s", this.#context.getRelativePath(file));
                this.update();
            }
        });
    }

    protected update() {
        const {files = [], base, build} = this.#config;
        const iterable = files
            .map((pattern) => glob.sync(pattern, {cwd: base}))
            .flat();

        this.#files.clear();
        this.#paths.clear();
        for (const file of iterable) {
            const source = join(base, file);
            const dest = join(build, file);
            this.#files.set(source, dest);
            this.#paths.add(dirname(source));
        }

        logger.debug(this, "push -> %o", this.readableFileList);
    }
}
