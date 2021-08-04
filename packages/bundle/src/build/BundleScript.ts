import {BuildOptions, BuildResult} from "esbuild";
import {copyFileSync, mkdirSync, watch} from "fs";
import glob from "glob";
import {dirname, join} from "path";
import {IArgumentList, relativeTo, resolveAt} from "../internal";
import logger from "../internal/logger";
import {BundleEntry} from "./BundleEntry";
import {DisposerStatic} from "./DisposerStatic";
import {IBundleScriptConfig} from "./interfaces";

export class BundleScript {
    public readonly id: string;
    public readonly entry: BundleEntry;
    public readonly config: IBundleScriptConfig;
    public readonly args: IArgumentList;
    public readonly files: string[] = [];

    constructor(args: IArgumentList, config: IBundleScriptConfig) {
        this.args = args;
        this.config = config;
        this.entry = new BundleEntry(config);
        this.id = relativeTo(args.path, config.base);
        this.files = this.createFileList();

        logger.info("[bundle %s]: initialize", this.id);

        if (this.args.watch) {
            const files = this.files ?? [];
            for (const file of files) {
                logger.info("[bundle %s]: watch", this.id, file);
                const watcher = watch(join(this.config.base, file), async () => this.copyFile(file));
                DisposerStatic.dispose(() => watcher.close());
            }

            for (const file of this.entry.getFileList()) {
                logger.info("[bundle %s]: watch -> %s", this.id, file);
                const watcher = watch(file, async () => this.entry.updateEntryPoints());
                DisposerStatic.dispose(() => watcher.close());
            }
        }
    }

    public async prepare() {
        const ops = [];
        for (const artifact of this.entry.getArtifacts()) {
            logger.info("[bundle %s]: prepare -> %s", this.id, artifact.name);
            ops.push(artifact.prepare(this));
        }

        await Promise.all(ops);
    }

    public getIncrementalConfig(): BuildOptions & { incremental: true } {
        return {
            ...this.getBuildConfig(),
            incremental: true,
        };
    }

    public getBuildConfig(): BuildOptions {
        const define: Record<string, any> = {};


        const {variables = {}, environment = [], loader = {}, plugins} = this.config;
        const variableStore = {...variables, ...process.env};
        const keys = new Set([...environment, ...Object.keys(variables)]);

        for (const variable of keys.values()) {
            define[variable] = JSON.stringify(variableStore[variable]);
        }

        define["process.env.NODE_ENV"] = define["NODE_ENV"] = JSON.stringify(this.args.mode);
        define["PRODUCTION"] = this.args.mode !== "development";
        define["DEVELOPMENT"] = !define["PRODUCTION"];

        const {sourcemap = this.args.isDevelopment, treeShaking = true, splitting = false} = this.config;

        logger.info("[bundle %s]: config -> %o", this.id, {sourcemap});

        return {
            loader,
            define,
            plugins,
            sourcemap,
            treeShaking,
            splitting,
            format: "esm",
            target: ["es2020"],
            platform: "browser",
            metafile: true,
            outdir: this.config.build,
            outbase: this.config.base,
            entryPoints: this.entry.getEntryPoints(),
            tsconfig: resolveAt(this.args.path, "tsconfig.json"),
            bundle: true,
            minify: this.args.isProduction,
            assetNames: "assets/[name].[hash]",
            chunkNames: "chunks/[hash]",
            resolveExtensions: [
                ".component.jsx",
                ".component.js",
                ".jsx",
                ".js",
                ".component.tsx",
                ".component.ts",
                ".tsx",
                ".ts",
            ],
        };
    }

    public async commit(result: BuildResult): Promise<void> {
        const ops = [];
        for (const artifact of this.entry.getArtifacts()) {
            logger.info("[bundle %s]: commit -> %s", this.id, artifact.name);
            ops.push(artifact.commit(this, result));
        }

        ops.push(this.copyFiles());

        await Promise.all(ops);
    }

    protected createFileList() {
        const {config: {files}} = this;
        if (!files) return [];

        const conf = {cwd: this.config.base};
        return files
            .map((pattern) => glob.sync(pattern, conf))
            .flat();
    }

    protected async copyFile(file: string) {
        const copyFrom = join(this.config.base, file);
        const copyTo = join(this.config.build, file);
        mkdirSync(dirname(copyTo), {recursive: true});
        copyFileSync(copyFrom, copyTo);

        logger.info("[bundle %s]: copy -> %s", this.id, file);
    }

    protected async copyFiles() {
        const ops = [];
        for (const file of this.files ?? []) {
            ops.push(this.copyFile(file));
        }

        await Promise.all(ops);
    }
}
