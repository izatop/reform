import {assignWithFilter, getResourcePath, PluginAbstract} from "@reform/bundle";
import {PluginBuild} from "esbuild";
import {readFile} from "fs/promises";

export type Config = { filter: RegExp };

export class Plugin extends PluginAbstract<Config> {
    constructor(config?: Config) {
        super(assignWithFilter({filter: /\.(eot|ttf|woff|woff2?|svg)([?|#].+)?$/}, config));
    }

    protected connect(build: PluginBuild): void {
        build.onResolve(this.config, (args) => ({
            path: getResourcePath(args.path),
            namespace: "font",
        }));

        build.onLoad({namespace: "font", filter: /^./}, async (args) => ({
            contents: await this.store(args.path, () => readFile(args.path)),
            loader: "file",
        }));
    }
}
