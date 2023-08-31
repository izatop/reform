import {Directory} from "./Directory";
import {File, FileEnc} from "./File";

export class FileFactory {
    public readonly prefix: Directory;

    constructor(prefix: Directory) {
        this.prefix = prefix;
    }

    public factory(file: string) {
        const {prefix: {path: prefix}} = this;
        
        return File.factory({prefix, relative: file});
    }

    public from(path: string) {
        const {prefix: {path: prefix}} = this;
        const relative = this.prefix.getRelativePath(path);
        
        return File.factory({prefix, relative});
    }

    public read(file: string): Promise<File<Buffer>>;

    public read(file: string, enc: FileEnc): Promise<File<string>>;

    public read(file: string, enc?: any): Promise<File<any>> {
        return this.factory(file)
            .read(enc);
    }
}
