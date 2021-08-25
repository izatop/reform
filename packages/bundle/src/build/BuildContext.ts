import {relative} from "path";
import {join} from "path/posix";
import {IArgumentList} from "../internal";
import {Directory, File} from "./Resources";
import {BundleCache} from "./BundleCache";
import {Format, Platform} from "esbuild";

export interface IBuildContextConfig {
    id: string | number;
    args: IArgumentList;
    base: Directory;
    build: Directory;
    format: Format;
    platform: Platform;
    entries: string[];
}

export class BuildContext {
    public readonly id: string;
    public readonly args: IArgumentList;
    public readonly cache: BundleCache;
    public readonly base: Directory;
    public readonly build: Directory;
    public readonly format: Format;
    public readonly platform: Platform;
    public readonly entries: ReadonlyArray<string>;

    // @todo
    public readonly publicPath = "";

    constructor(config: IBuildContextConfig) {
        this.id = `${config.id}`;
        this.base = config.base;
        this.build = config.build;
        this.args = config.args;
        this.format = config.format;
        this.platform = config.platform;
        this.entries = config.entries;

        this.cache = new BundleCache(this, this.base);
    }

    public get watch() {
        return this.args.watch;
    }

    public getRelative = (file: string) => {
        return relative(this.base.path, file);
    };

    public getSource = (file: string) => {
        return join(this.base.path, file);
    };

    public getSourceFile = (file: string) => {
        return File.factory({prefix: this.base.path, relative: file});
    };

    public getDestination = (file: string) => {
        return join(this.build.path, file);
    };

    public getSourceMap = (files: string[]) => {
        return files.map((file) => this.getSource(file));
    };
}
