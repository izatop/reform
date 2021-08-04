import {dirname} from "path";
import {resolveStrictAt} from "../internal";
import {ApplicationEntry} from "./Artifact/ApplicationEntry";
import {BundleArtifactAbstract} from "./BundleArtifactAbstract";
import {IBundleScriptConfig} from "./interfaces";

export class BundleEntry {
    public readonly config: IBundleScriptConfig;
    protected readonly entry: string[];

    #artifacts: BundleArtifactAbstract[] = [];
    #entryPoints: string[] = [];

    constructor(config: IBundleScriptConfig) {
        this.config = config;
        this.entry = config.entry;
        this.updateEntryPoints();
    }

    public getFileList(): string[] {
        return [...new Set([...this.entry, ...this.#entryPoints]).values()];
    }

    public updateEntryPoints(): void {
        this.#entryPoints = this.entry.map((entry) => this.resolveEntryPoints(entry)).flat();
    }

    public getEntryPoints(): string[] {
        return this.#entryPoints;
    }

    public getArtifacts(): BundleArtifactAbstract[] {
        return this.#artifacts;
    }

    private resolveEntryPoints(entry: string): string[] {
        const entries: string[] = [];
        if (entry.endsWith(".html")) {
            const applicationEntry = new ApplicationEntry(entry);
            this.#artifacts.push(applicationEntry);

            const resourceList = applicationEntry.document.getEntryPoints();
            const resolvedEntries = resourceList.map((file) => (
                resolveStrictAt(dirname(entry), file, `entry=${entry}?${file}`)
            ));

            entries.push(...resolvedEntries);

            return entries;
        }

        return [entry, ...entries];
    }
}
