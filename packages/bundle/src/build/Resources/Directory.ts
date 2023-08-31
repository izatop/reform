import {relative} from "path";

import {FilePrefix} from "./File.js";
import {FileFactory} from "./FileFactory.js";
import {ResourceAbstract} from "./ResourceAbstract.js";

export class Directory extends ResourceAbstract {
    public readonly fileFactory: FileFactory;

    constructor(prefix: FilePrefix, relative: string) {
        super(prefix, relative);

        this.fileFactory = new FileFactory(this);
    }

    public static factory(prefix: FilePrefix, relative: string): Directory {
        return new this(prefix, relative);
    }

    public getRelativePath(file: FilePrefix): string {
        return relative(this.path, file.toString());
    }
}
