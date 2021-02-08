import {watch} from "fs";
import {dirname} from "path";
import {IArgumentList, resolveAt, resolveStrictAt} from "../internal";
import {BundleArtifactAbstract} from "./BundleArtifactAbstract";
import {DisposerStatic} from "./DisposerStatic";
import {HTMLDocumentEntry} from "./HTMLDocumentEntry";
import {IBuildPaths} from "./interfaces";

export class BundleEntry {
    public readonly args: IArgumentList;
    public readonly build: IBuildPaths;
    public readonly entry: string;

    #artifacts: BundleArtifactAbstract[] = [];
    #entryPoints: string[] = [];

    constructor(args: IArgumentList, build: IBuildPaths, entry: string) {
        this.args = args;
        this.build = build;
        this.entry = entry;
        this.#entryPoints = this.resolveEntryPoints(this.entry);

        if (this.args.watch) {
            const watcher = watch(this.entry, () => {
                this.#entryPoints = this.resolveEntryPoints(this.entry);
            });

            DisposerStatic.dispose(() => watcher.close());
        }
    }

    public getEntryPoints(): string[] {
        return this.#entryPoints;
    }

    public getArtifacts(): BundleArtifactAbstract[] {
        return this.#artifacts;
    }

    private resolveEntryPoints(entry: string): string[] {
        if (entry.endsWith(".html")) {
            const path = resolveAt(this.args.path, entry);
            const document = new HTMLDocumentEntry(path);
            this.#artifacts = [document];

            const resourceList = document.getResourceList();
            return resourceList.map((file) => (
                resolveStrictAt(dirname(path), file, `bundle[].source=${entry}?${file}`)
            ));
        }

        return [entry];
    }
}
