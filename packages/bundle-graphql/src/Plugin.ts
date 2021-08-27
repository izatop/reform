import {assignWithFilter, PluginAbstract, BuildContext, File} from "@reform/bundle";

export type Config = {filter: RegExp};

// eslint-disable-next-line @typescript-eslint/no-var-requires
const loader = require("graphql-tag/loader");
const toQuery = (file: File<string>) => loader.call({cacheable: () => false}, file.contents);

export class Plugin extends PluginAbstract<Config> {
    public readonly name = "@reform/bundle-graphql";

    constructor(context: BuildContext, config?: Config) {
        super(context, assignWithFilter({filter: /\.(graphql|gql)$/}, config));
    }

    protected configure(): void {
        const {context: {cache, base: {fileFactory}}} = this;
        this.on("load", this.config, async (args) => {
            const file = this.getRelativePath(args.path);

            const contents = await cache.store(
                file,
                async () => fileFactory
                    .read(file, "utf-8")
                    .then(toQuery),
            );

            return {contents, loader: "js"};
        });
    }
}
