import {assert, assignWithFilter, BuildContext, PluginAbstract} from "@reform/bundle";

import {DocFile} from "./File/index.js";
import {AttachFileType} from "./interface.js";

export type Config = {filter: RegExp; attach?: AttachFileType[]; artifacts?: string};
export const artifacts = "^.+$";
export const attach: AttachFileType[] = ["stylesheet"];

export class Plugin extends PluginAbstract<Config> {
    public readonly name = "@reform/html";

    readonly #documents = new Map<string, DocFile>();

    constructor(context: BuildContext, config?: Config) {
        super(context, assignWithFilter({filter: /\.html?$/, attach, artifacts}, config));
    }

    public async configure(): Promise<void> {
        const {filter, ...config} = this.config;
        const {platform} = this.context;
        assert(platform !== "node", `The ${this.name} plugin works with browser or neutral platform`);

        this
            .on("load", {filter}, async ({path}) => {
                const entry = this.getRelativePath(path);
                this.#documents.set(
                    entry,
                    await DocFile.parse(this.context, entry, config.attach, config.artifacts),
                );

                const document = this.getContents(this.getRelativePath(path));
                await document.parse();
                const {code: contents, prefix: resolveDir, watchFiles} = document;

                return {contents, resolveDir, watchFiles};
            })
            .on("end", async ({metafile}) => {
                const ops = [];
                for (const document of this.#documents.values()) {
                    ops.push(document.build(metafile));
                }

                await Promise.all(ops);
            });
    }

    private getContents(path: string): DocFile {
        const docFile = this.#documents.get(path);
        assert(docFile, `Unknown document ${path}`);

        return docFile;
    }
}
