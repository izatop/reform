import * as crypto from "crypto";
import {BuildOptions} from "esbuild";
import {watch} from "fs";
import {IArgumentList, resolveAt} from "../internal";
import {SassLoader} from "../plugins";
import {BundleEntry} from "./BundleEntry";
import {DisposerStatic} from "./DisposerStatic";
import {IBuildPaths, IBundleScriptConfig} from "./interfaces";

export class BundleScript {
    public readonly id: string;
    public readonly entry: BundleEntry;
    public readonly args: IArgumentList;
    public readonly options: IBundleScriptConfig;
    public readonly build: IBuildPaths;

    constructor(args: IArgumentList, entry: BundleEntry, options: IBundleScriptConfig) {
        this.args = args;
        this.options = options;
        this.build = options.build;
        this.entry = entry;

        const encoded = [...this.entry.entry]
            .map((item) => item.charCodeAt(0))
            .join("");

        this.id = crypto.createHash("sha1")
            .update(encoded)
            .digest()
            .toString("hex");

        if (this.args.watch) {
            const watcher = watch(this.entry.entry, async () => {
                this.entry.updateEntryPoints();
                await this.commit();
            });

            DisposerStatic.dispose(() => watcher.close());
        }
    }

    public get metaFile() {
        return resolveAt(this.build.path, `${this.id}.json`);
    }

    public getIncrementalConfig(): BuildOptions & { incremental: true } {
        return {
            ...this.getBuildConfig(),
            incremental: true,
        };
    }

    public getBuildConfig(): BuildOptions {
        const sassLoader = new SassLoader({filter: /\.scss$/});
        const define: Record<string, string> = {};
        if (this.options.environment) {
            const {environment} = this.options;
            for (const env of environment) {
                define[env] = JSON.stringify(process.env[env] ?? "");
                define[`process.env.${env}`] = JSON.stringify(process.env[env] ?? "");
            }
        }

        return {
            define,
            format: "esm",
            target: ["es2020"],
            platform: "browser",
            metafile: this.metaFile,
            outdir: this.build.path,
            outbase: this.build.source,
            entryPoints: this.entry.getEntryPoints(),
            tsconfig: resolveAt(this.args.path, "tsconfig.json"),
            bundle: true,
            splitting: true,
            treeShaking: true,
            sourcemap: this.args.isDevelopment,
            minify: this.args.isProduction,
            resolveExtensions: [
                ".component.tsx",
                ".component.ts",
                ".tsx",
                ".ts",
                ".component.jsx",
                ".component.js",
                ".jsx",
                ".js",
            ],
            plugins: [
                sassLoader.getPluginConfig(),
            ],
            loader: {
                ...this.options.loader,
                ".js": "js",
                ".jsx": "jsx",
                ".ts": "ts",
                ".tsx": "tsx",
            },
        };
    }

    public async commit(): Promise<void> {
        for (const artifact of this.entry.getArtifacts()) {
            await artifact.commit(this);
        }
    }
}
