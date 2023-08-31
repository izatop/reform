import {Format, Loader, Platform} from "esbuild";
import {join, relative} from "path";

import {assert, IArgumentList} from "../internal/index.js";
import {BundleCache} from "./BundleCache.js";
import {Directory, File} from "./Resources/index.js";

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

    public readonly loader = new Map<string, Loader>();

    public readonly extensions = new Set<string>();

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

    public addLoaders(loaders: [ext: string, loader: Loader][]) {
        for (const [ext, loader] of loaders) {
            assert(
                !this.loader.has(ext) || this.loader.get(ext) === loader,
                `Loader ${loader} for ${ext} already exists`,
            );

            this.loader.set(`.${ext.replace(/^\.*/, "")}`, loader);
        }
    }

    public addExtensions(...extensions: string[]) {
        extensions.forEach((ext) => this.extensions.add(`.${ext.replace(/^\.*/, "")}`));
    }

    public getExtensions() {
        return [...this.extensions.values()];
    }

    public getLoaders() {
        return [...this.loader.entries()];
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
