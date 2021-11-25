import {existsSync} from "fs";
import {join} from "path";
import {PluginBuild} from "esbuild";
import {
    BuildContext, BundleArgs, Directory, FileCopyList, FileEntryList,
} from "../build";
import {
    arrayify, assert, entriesMap, IArgumentList, mutate,
} from "../internal";
import {load} from "../plugins";
import {IJSONSchema, IPluginList} from "./interfaces";

export class JSONConfig {
    public readonly config: IJSONSchema;
    public readonly args: IArgumentList;

    constructor(args: IArgumentList) {
        this.args = args;

        const path = join(args.path, "bundle.json");
        assert(existsSync(path), "Configuration file not found", {path});

        this.config = require(path);
    }

    public async * getBundleArgs(): AsyncGenerator<BundleArgs> {
        let increment = 1;
        const {preset: presetList = {}} = this.config;
        for (const {preset, ...next} of this.config?.bundle ?? []) {
            const bundle = mutate(mutate({}, presetList[preset ?? ""] ?? {}), next);

            // @see https://esbuild.github.io/api/#platform
            const {format = "iife", platform = "browser"} = bundle;
            const {id = increment++, entry, envFiles, files, plugins, ...settings} = bundle;
            const base = Directory.factory(this.args.path, bundle.base);
            const build = Directory.factory(this.args.path, bundle.build);
            const context = new BuildContext({
                id,
                base,
                build,
                format,
                platform,
                args: this.args,
                entries: arrayify(entry),
            });

            yield {
                context,
                config: {
                    ...settings,
                    id,
                    base,
                    build,
                    format,
                    platform,
                    files: new FileCopyList(context, files),
                    entry: new FileEntryList(context, arrayify(entry)),
                    plugins: await this.getPlugins(context, plugins),
                    envFiles: arrayify(envFiles ?? []),
                },
            };
        }
    }

    private getPlugins(context: BuildContext, plugins: Partial<IPluginList> = {}) {
        const ops = entriesMap(plugins, async ([id, options]) => {
            const plugin = load(id, context, options);
            await plugin.configure();

            return {
                name: plugin.name,
                setup(build: PluginBuild) {
                    return plugin.setup(build);
                },
            };
        });

        return Promise.all(ops);
    }
}
