import {join} from "path";
import {assert} from "../../internal";
import {FilePrefix} from "./File";

export class ResourceAbstract {
    public readonly prefix: string;
    public readonly relative: string;
    public readonly path: string;

    constructor(prefix: FilePrefix, relative: string) {
        assert(prefix, `Wrong prefix "${prefix}" for "${relative}"`);

        this.prefix = prefix.toString();
        this.relative = relative;

        this.path = join(this.prefix, relative);
    }

    public resolve(path: FilePrefix) {
        return join(this.path, path.toString());
    }

    public toString() {
        return this.path;
    }
}
