import {dirname, relative} from "path";
import {readFile, stat, mkdir, writeFile} from "fs/promises";
import {ResourceAbstract} from "./ResourceAbstract";
import {Directory} from "./Directory";
import logger from "../../internal/logger";
import {createHash} from "crypto";

export type FileEnc = BufferEncoding;
export type FileTag = Record<any, any>;
export type FilePrefix = string | Directory;
export type FileContentType = string | Buffer;
export type FileContentTransform<T extends FileContentType | null> = T extends null
    ? undefined
    : (contents: T) => T;

export interface FileConfig<T extends FileContentType | null = null> {
    readonly prefix: FilePrefix;
    readonly relative: string;
    readonly transform?: T extends null ? never : FileContentTransform<T>;
}

export class File<T extends FileContentType | null = null> extends ResourceAbstract {
    #transform?: FileContentTransform<T>;
    #contents: T;
    #hash?: string;

    readonly #config: FileConfig<T>;

    constructor(config: FileConfig<T>, contents: T) {
        super(config.prefix, config.relative);

        this.#config = config;
        this.#contents = contents;
        this.#transform = config.transform;
    }

    public get id() {
        return this.relative;
    }

    public get contents() {
        return this.#contents;
    }

    public get dir() {
        return dirname(this.path);
    }

    public get config() {
        return this.#config;
    }

    public hasContent(this: File<T>): this is File<FileContentType> {
        return this.contents !== null;
    }

    public static factory(config: FileConfig<null>): File<null>;
    public static factory<T extends FileContentType>(config: FileConfig<T>, contents: T): File<T>;
    public static factory(config: FileConfig<any>, contents?: any): File<any> {
        return new File<any>(config, contents ?? null);
    }

    public static async read(config: FileConfig<string>, enc: FileEnc): Promise<File<string>>;
    public static async read(config: FileConfig<Buffer>): Promise<File<Buffer>>;
    public static async read(config: FileConfig<any>, enc?: any): Promise<File<any>> {
        return File.factory(config)
            .read(enc);
    }

    public async read(this: File<T>): Promise<File<Buffer>>;
    public async read(this: File<T>, enc: FileEnc): Promise<File<string>>;
    public async read(this: File<any>, enc?: any): Promise<File<any>> {
        const {prefix, relative, path} = this;

        return new File<any>({prefix, relative}, await readFile(path, enc));
    }

    public async transform<S extends FileContentType>(this: File<S>, transform: FileContentTransform<T>) {
        const {prefix, relative} = this;

        return File.factory({prefix, relative, transform}, this.contents);
    }

    public async copy<S extends FileContentType>(this: File<S>, dest: File<null>) {
        await File.ensurePath(dest);

        const {contents} = this;
        const {prefix, relative} = dest;
        await writeFile(dest.path, contents);

        return File.factory({prefix, relative}, contents);
    }

    public async write<N extends FileContentType>(contents: N) {
        await File.ensurePath(this);
        await writeFile(this.path, contents);

        return this;
    }

    public isExtensionEquals(candidate: string) {
        return this.path.endsWith(`.${candidate}`);
    }

    public toString() {
        return this.path;
    }

    public static async ensurePath(file: File<any>) {
        const prefix = relative(file.prefix, file.dir);

        try {
            logger.debug(file, "stat -> %s", prefix === "" ? "./" : prefix);
            await stat(file.dir);
        } catch {
            logger.debug(file, "mkdir -> %s", prefix === "" ? "./" : prefix);
            await mkdir(file.dir, {recursive: true});
        }
    }

    public getHash<C extends FileContentType>(this: File<C>, len = 4) {
        if (this.#hash) {
            return this.#hash.substr(0, len);
        }

        this.#hash = createHash("sha1")
            .update(this.contents)
            .digest("hex");

        return this.#hash.substr(0, len);
    }
}
