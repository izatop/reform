import {assignWithFilter, PluginAbstract} from "@reform/bundle";
import {BuildContext} from "@reform/bundle/dist/build/BuildContext";
import {PluginBuild} from "esbuild";
import {readFile} from "fs/promises";

export type Config = { filter: RegExp };

// eslint-disable-next-line @typescript-eslint/no-var-requires
const loader = require("graphql-tag/loader");

export class Plugin extends PluginAbstract<Config> {
    constructor(context: BuildContext, config?: Config) {
        super(context, assignWithFilter({filter: /\.(graphql|gql)$/}, config));
    }

    protected connect(build: PluginBuild): void {
        const {context: {cache}} = this;
        build.onLoad(this.config, async (args) => {
            const contents = await cache.store(args.path, async () => {
                const content = await readFile(args.path, {encoding: "utf-8"});
                return loader.call({cacheable: () => void 0}, content);
            });

            return {contents, loader: "js"};
        });
    }
}
