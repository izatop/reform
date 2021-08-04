import {PluginAbstract} from "@reform/bundle";
import {PluginBuild} from "esbuild";
import {promises as fs} from "fs";

export type PluginConfig = { filter: RegExp };

// eslint-disable-next-line @typescript-eslint/no-var-requires
const loader = require("graphql-tag/loader");
export const DefaultConfig: PluginConfig = {filter: /\.(graphql|gql)$/};

export class Plugin extends PluginAbstract<PluginConfig> {
    constructor(config = DefaultConfig) {
        super(config);
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
