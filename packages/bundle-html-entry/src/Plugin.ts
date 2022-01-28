import {BuildContext, PluginAbstract, assignWithFilter, assert} from "@reform/bundle";
import {DocFile} from "./File";
import {AttachFileType} from "./interface";

export type Config = {filter: RegExp; attach?: AttachFileType[]};

export class Plugin extends PluginAbstract<Config> {
    public readonly name = "@reform/bundle-html-entry";

    readonly #documents = new Map<string, DocFile>();

    constructor(context: BuildContext, config?: Config) {
        super(context, assignWithFilter({filter: /\.html?$/}, config));
    }

    public async configure(): Promise<void> {
        const {filter, attach} = this.config;
        const {platform} = this.context;
        assert(platform !== "node", `The ${this.name} plugin works with browser or neutral platform`);

        this
            .on("load", {filter}, async ({path}) => {
                const entry = this.getRelativePath(path);
                this.#documents.set(entry, await DocFile.parse(this.context, entry));

                const document = this.getContents(this.getRelativePath(path));
                await document.parse();
                const {code: contents, prefix: resolveDir, watchFiles} = document;

                return {contents, resolveDir, watchFiles};
            })
            .on("end", async ({metafile}) => {
                const ops = [];
                for (const document of this.#documents.values()) {
                    ops.push(document.build(metafile, attach));
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
