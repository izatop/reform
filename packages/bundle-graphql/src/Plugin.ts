import {dirname} from "path";
import {assignWithFilter, PluginAbstract, BuildContext} from "@reform/bundle";
import {loadDocuments} from "@graphql-tools/load";
import {GraphQLFileLoader} from "@graphql-tools/graphql-file-loader";

export type Config = {filter: RegExp};

const extensions = ["gql", "graphql"];
const defaultFilter = new RegExp(`\\.(${extensions.join("|")})$`);
const re = /#\s*import\s*([0-9a-z_]+) from "([\\/0-9a-z_\\.-]+)"/ig;

export class Plugin extends PluginAbstract<Config> {
    public readonly name = "@reform/bundle-graphql";

    constructor(context: BuildContext, config?: Config) {
        super(context, assignWithFilter({filter: defaultFilter}, config));
    }

    public configure(): void {
        const {context: {cache}} = this;

        this
            .on("load", this.config, async (args) => {
                const file = this.getRelativePath(args.path);
                const contents = await cache.store(
                    file,
                    async () => {
                        const [{document}] = await loadDocuments(args.path, {loaders: [new GraphQLFileLoader()]});

                        return JSON.stringify(document);
                    },
                );

                return {contents, loader: "json", resolveDir: dirname(args.path)};
            });
    }
}
