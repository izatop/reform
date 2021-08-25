import {FileList} from "./FileList";

export class FileArtifactList extends FileList {
    public change(file: string) {
        super.change(file);
        this.build();
    }
}
