import {Directory} from "./Directory.js";
import {File, FileEnc} from "./File.js";

export class FileFactory {
    public readonly prefix: Directory;

    constructor(prefix: Directory) {
        this.prefix = prefix;
    }

    public factory(file: string): File {
        const {
            prefix: {path: prefix},
        } = this;

        return File.factory({prefix, relative: file});
    }

    public from(path: string): File {
        const {
            prefix: {path: prefix},
        } = this;
        const relative = this.prefix.getRelativePath(path);

        return File.factory({prefix, relative});
    }

    public read(file: string): Promise<File<Buffer>>;

    public read(file: string, enc: FileEnc): Promise<File<string>>;

    public read(file: string, enc?: any): Promise<File<any>> {
        return this.factory(file).read(enc);
    }
}
