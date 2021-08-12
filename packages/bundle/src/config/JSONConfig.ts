import {existsSync} from "fs";
import {join} from "path";
import {BundleArgs} from "../build";
import {FileList} from "../build/Artifact/FileList";
import {BuildContext} from "../build/BuildContext";
import {assert, IArgumentList, resolveStrictAt} from "../internal";
import {mutate} from "../internal/object";
import {load} from "../plugins";
import {IJSONSchema} from "./interfaces";

export class JSONConfig {
    public readonly config: IJSONSchema;
    public readonly args: IArgumentList;

    constructor(args: IArgumentList) {
        this.args = args;

        const path = join(args.path, "bundle.json");
        assert(existsSync(path), "Configuration file not found", {path});

        this.config = require(path);
    }

    public * getBundleArgs(): Generator<BundleArgs> {
        let increment = 1;
        const {preset: presetList = {}} = this.config;
        for (const next of this.config?.bundle ?? []) {
            const bundle = mutate(mutate({}, presetList[next.preset ?? ""] ?? {}), next);

            const base = resolveStrictAt(
                this.args.path,
                bundle.base,
                "Missing field: bundle[].base",
            );

            const build = resolveStrictAt(
                this.args.path,
                bundle.build,
                "Missing field: bundle[].build",
            );

            const {id = increment++, splitting, treeShaking, sourcemap} = bundle;
            const context = new BuildContext(`${id}`, this.args, base, build);
            const plugins = Object
                .entries(bundle.plugins ?? {})
                .map(([id, options]) => load(id, context, options));

            const config = {
                id,
                base,
                build,
                plugins,
                sourcemap,
                splitting,
                treeShaking,
                entry: bundle.entry.map((entry) => join(base, entry)),
                files: new FileList(context, bundle.files),
                variables: bundle.variables,
                environment: bundle.environment,
                loader: bundle.loader,
                serve: bundle.serve,
                app: bundle.app,
            };

            yield {context, config};
        }
    }
}
