import {assign, getResourcePath, PluginAbstract} from "@reform/bundle";
import {PluginBuild} from "esbuild";
import {promises as fs} from "fs";

export type Config = { filter: RegExp };

export class Plugin extends PluginAbstract<Config> {
    constructor(config?: Config) {
        super(assign({filter: /\.(eot|ttf|woff|woff2?|svg)([?|#].+)?$/}, config));
    }

    protected connect(build: PluginBuild): void {
        const {filter} = this.config;

        build.onResolve({filter}, (args) => ({
            path: getResourcePath(args.path),
            namespace: "font",
        }));

        build.onLoad({namespace: "font", filter: /^./}, async (args) => ({
            loader: "file",
            contents: await fs.readFile(args.path),
        }));
    }
}
