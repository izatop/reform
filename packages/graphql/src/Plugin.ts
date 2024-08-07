import {GraphQLFileLoader} from "@graphql-tools/graphql-file-loader";
import {extractImportLines, parseImportLine} from "@graphql-tools/import";
import {loadDocuments} from "@graphql-tools/load";
import {assignWithFilter, BuildContext, PluginAbstract} from "@reform/bundle";
import {readFileSync} from "fs";
import {dirname, resolve} from "path";

export type Config = {filter: RegExp};

const extensions = ["gql", "graphql"];
const defaultFilter = new RegExp(`\\.(${extensions.join("|")})$`);

export class Plugin extends PluginAbstract<Config> {
    public readonly name = "@reform/graphql";

    constructor(context: BuildContext, config?: Config) {
        super(context, assignWithFilter({filter: defaultFilter}, config));
    }

    public configure(): void {
        this.on("load", this.config, async ({path}) => {
            const options = await this.cache.store(path, async (deps) => {
                const watchFiles: string[] = [];
                const {importLines} = extractImportLines(readFileSync(path, "utf-8"));
                for (const line of importLines) {
                    const {from} = parseImportLine(line.replace("#", "").trim());
                    const importPath = resolve(dirname(path), from);
                    watchFiles.push(importPath);
                    deps.push(importPath);
                }

                const [{document}] = await loadDocuments(path, {loaders: [new GraphQLFileLoader()]});

                return {
                    contents: JSON.stringify(document),
                    watchFiles,
                };
            });

            return {
                loader: "json",
                resolveDir: dirname(path),
                ...options,
            };
        });
    }
}
