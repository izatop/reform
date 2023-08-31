import {stat} from "fs/promises";

import {assert, logger} from "../../internal";
import {BuildContext} from "../BuildContext";
import {File} from "./File";

export type FileListResult = {src: File<Buffer>; dest: File<Buffer>};
export type FileError = {error: Error; file: string};

export class FileList {
    readonly #result = new Map<string, FileListResult>();

    readonly #origins = new Map<string, File<null>>();

    readonly #context: BuildContext;

    constructor(context: BuildContext, files: string[] = []) {
        this.#context = context;

        files.forEach((file) => this.add(file));
    }

    public get id() {
        return this.#context.id;
    }

    public get files() {
        return [...this.#origins.values()]
            .map((file) => file.relative);
    }

    public get paths() {
        return [...this.#origins.values()]
            .map((file) => file.path);
    }

    public get built() {
        return [...this.#result.values()]
            .map(({dest}) => dest);
    }

    protected get cache() {
        return this.#context.cache;
    }

    protected get base() {
        return this.#context.base;
    }

    public getBuilt(file: string) {
        const result = this.#result.get(file);
        assert(result, `Can't find built ${file}`);

        return result.dest;
    }

    public add(file: string) {
        const {base: {fileFactory}} = this.#context;
        const origin = fileFactory.factory(file);
        this.#origins.set(file, origin);
        this.#result.delete(file);

        this.cache.on(file, (event) => {
            logger.debug(this, "%s -> %s", event, file);

            if (event === "change") {
                this.change(file);
            }

            if (event === "unlink" || event === "rename") {
                this.remove(file);
            }
        });

        return origin;
    }

    public change(file: string) {
        this.#result.delete(file);
    }

    public remove(file: string) {
        this.#origins.delete(file);
        this.#result.delete(file);

        this.cache.off(file);
    }

    public reset(files: string[]) {
        if (files.length) {
            this.cache.reset();
            this.#origins.clear();
            this.#result.clear();

            files.forEach((file) => this.add(file));
        }

        return this;
    }

    public async build() {
        const ops = [];
        for (const src of this.#origins.values()) {
            ops.push(this.copy(src));
        }

        await Promise.all(ops);
    }

    private async copy(file: File<null>) {
        if (this.#result.has(file.relative)) {
            return;
        }

        const {build: {fileFactory}} = this.#context;

        const src = await file.read();
        const dest = fileFactory.factory(file.relative);

        logger.debug(this, "copy -> %s", src.relative);
        this.#result.set(src.relative, {src, dest: await src.copy(dest)});
    }

    public async check(): Promise<FileError[]> {
        const ops = [];
        const errors: FileError[] = [];
        for (const file of this.#origins.values()) {
            ops.push(
                stat(file.path)
                    .then((stat) => assert(stat.isFile(), "Not a file"))
                    .catch((error) => errors.push({error, file: file.relative})),
            );
        }

        await Promise.all(ops);

        return errors;
    }
}
