import {IArgumentList, resolveStrictAt} from "../internal";
import {BundleEntry} from "./BundleEntry";
import {BundleScript} from "./BundleScript";
import {IJSONConfig} from "./interfaces";

export class JSONConfig {
    public readonly configPath: string;
    public readonly config: IJSONConfig;
    public readonly args: IArgumentList;

    constructor(args: IArgumentList, configPath: string) {
        this.args = args;
        this.configPath = configPath;
        this.config = require(configPath);
    }

    public getBundleScriptList(): BundleScript[] {
        const bundleScriptList: BundleScript[] = [];
        for (const bundle of this.config?.bundle ?? []) {
            const path = resolveStrictAt(
                this.args.path, bundle.build.path,
                "Missing field: bundle[].build.path",
            );

            const source = resolveStrictAt(
                this.args.path, bundle.build.source,
                "Missing field: bundle[].build.source",
            );

            const bundleScript = new BundleScript(
                this.args,
                new BundleEntry(this.args, {path, source}, bundle.entry),
                {
                    build: {path, source},
                    environment: bundle.environment,
                    loader: bundle.loader,
                    serve: bundle.serve,
                },
            );

            bundleScriptList.push(bundleScript);
        }

        return bundleScriptList;
    }
}
