import {BundleScript} from "../build";
import {IArgumentList, resolveAt, resolveStrictAt} from "../internal";
import {load} from "../plugins";
import {IJSONSchema} from "./interfaces";

export class JSONConfig {
    public readonly configPath: string;
    public readonly config: IJSONSchema;
    public readonly args: IArgumentList;

    constructor(args: IArgumentList, configPath: string) {
        this.args = args;
        this.configPath = configPath;
        this.config = require(configPath);
    }

    public getBundleScriptList(): BundleScript[] {
        const bundleScriptList: BundleScript[] = [];
        for (const bundle of this.config?.bundle ?? []) {
            const base = resolveStrictAt(
                this.args.path, bundle.base,
                "Missing field: bundle[].base",
            );

            const build = resolveStrictAt(
                this.args.path, bundle.build,
                "Missing field: bundle[].build",
            );

            const {splitting, treeShaking, sourcemap, plugins = {}} = bundle;
            const bundleScript = new BundleScript(
                this.args,
                {
                    base,
                    build,
                    sourcemap,
                    splitting,
                    treeShaking,
                    plugins: Object.entries(plugins).map(([id, options]) => load(id, options)),
                    entry: bundle.entry.map((entry) => resolveAt(base, entry)),
                    files: bundle.files,
                    variables: bundle.variables,
                    environment: bundle.environment,
                    loader: bundle.loader,
                    serve: bundle.serve,
                    app: bundle.app,
                },
            );

            bundleScriptList.push(bundleScript);
        }

        return bundleScriptList;
    }
}
