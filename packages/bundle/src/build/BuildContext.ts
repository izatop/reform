import {relative} from "path";
import {IArgumentList} from "../internal";
import {BundleCache} from "./BundleCache";

export class BuildContext {
    public readonly id: string;
    public readonly args: IArgumentList;
    public readonly cache: BundleCache;
    public readonly base: string;
    public readonly build: string;

    constructor(id: string, args: IArgumentList, base: string, build: string) {
        this.id = id;
        this.base = base;
        this.build = build;
        this.args = args;
        this.cache = new BundleCache(this, this.base);
    }

    public get watch() {
        return this.args.watch;
    }

    public getRelativePath(file: string) {
        return relative(this.base, file);
    }
}
