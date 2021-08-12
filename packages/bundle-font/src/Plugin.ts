import {assignWithFilter, getResourcePath, PluginAbstract} from "@reform/bundle";
import {BuildContext} from "@reform/bundle/dist/build/BuildContext";
import {PluginBuild} from "esbuild";
import {readFile} from "fs/promises";

export type Config = { filter: RegExp };

export class Plugin extends PluginAbstract<Config> {
    constructor(context: BuildContext, config?: Config) {
        super(context, assignWithFilter({filter: /\.(eot|ttf|woff|woff2?|svg)([?|#].+)?$/}, config));
    }

    protected connect(build: PluginBuild): void {
        const {context: {cache}} = this;

        build.onResolve(this.config, (args) => ({
            path: getResourcePath(args.path),
            namespace: "font",
        }));

        build.onLoad({namespace: "font", filter: /^./}, async (args) => ({
            contents: await cache.store(args.path, () => readFile(args.path)),
            loader: "file",
        }));
    }
}
