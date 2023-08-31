import {FileList} from "./FileList.js";

export class FileArtifactList extends FileList {
    public change(file: string): void {
        super.change(file);
        this.build();
    }
}
