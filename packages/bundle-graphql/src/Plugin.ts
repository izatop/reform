import {PluginAbstract} from "@reform/bundle";
import {PluginBuild} from "esbuild";
import {promises as fs} from "fs";
import {assign} from "@reform/bundle";

export type Config = { filter: RegExp };

// eslint-disable-next-line @typescript-eslint/no-var-requires
const loader = require("graphql-tag/loader");
export const DefaultConfig: Config = {filter: /\.(graphql|gql)$/};

export class Plugin extends PluginAbstract<Config> {
    constructor(config?: Config) {
        super(assign({filter: /\.(graphql|gql)$/}, config));
    }

    protected connect(build: PluginBuild): void {
        const {filter} = this.config;

        build.onLoad({filter}, async (args) => {
            const content = await fs.readFile(args.path, {encoding: "utf-8"});
            return {
                contents: loader.call({cacheable: () => void 0}, content),
                loader: "js",
            };
        });
    }
}
