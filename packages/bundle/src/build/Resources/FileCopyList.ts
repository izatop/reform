import {glob} from "glob";

import {BuildContext} from "../BuildContext.js";
import {File} from "./File.js";
import {FileArtifactList} from "./FileArtifactList.js";

export class FileCopyList extends FileArtifactList {
    public readonly patterns: string[];

    constructor(context: BuildContext, patterns: string[] = []) {
        super(context, FileCopyList.scan(context.base.path, patterns));

        this.patterns = patterns;
    }

    public static scan(cwd: string, patterns: string[]): string[] {
        return patterns
            .map((pattern) => glob.sync(pattern, {cwd, nodir: true}))
            .flat();
    }

    public add(file: string): File<null> {
        const origin = super.add(file);

        this.cache.on(origin.dir, (event) => {
            switch (event) {
                case "add":
                case "renameDir":
                    this.reset(FileCopyList.scan(this.base.path, this.patterns));
                    break;
            }
        });

        return origin;
    }
}
