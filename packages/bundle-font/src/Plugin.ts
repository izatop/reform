import {PluginAbstract} from "@reform/bundle";
import {getResourcePath} from "@reform/bundle/dist/internal";
import {PluginBuild} from "esbuild";
import {promises as fs} from "fs";

export type PluginConfig = { filter: RegExp };

export const DefaultConfig: PluginConfig = {filter: /\.(eot|ttf|woff|woff2?|svg)([?|#].+)?$/};

export class Plugin extends PluginAbstract<PluginConfig> {
    constructor(config = DefaultConfig) {
        super(config);
    }

    protected connect(build: PluginBuild): void {
        const {filter} = this.config;

        build.onResolve({filter}, (args) => ({
            path: getResourcePath(args.path),
            namespace: "font",
        }));

        build.onLoad({namespace: "font", filter: /.+/}, async (args) => ({
            loader: "file",
            contents: await fs.readFile(args.path),
        }));
    }
}
