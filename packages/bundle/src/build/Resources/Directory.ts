import {relative} from "path";

import {FilePrefix} from "./File";
import {FileFactory} from "./FileFactory";
import {ResourceAbstract} from "./ResourceAbstract";

export class Directory extends ResourceAbstract {
    public readonly fileFactory: FileFactory;

    constructor(prefix: FilePrefix, relative: string) {
        super(prefix, relative);

        this.fileFactory = new FileFactory(this);
    }

    public static factory(prefix: FilePrefix, relative: string) {
        return new this(prefix, relative);
    }

    public getRelativePath(file: FilePrefix) {
        return relative(this.path, file.toString());
    }
}
