import {config, DotenvParseOutput} from "dotenv";
import {build, BuildFailure, BuildOptions, BuildResult} from "esbuild";
import {existsSync, watch} from "fs";
import {join, relative} from "path";
import {defer, onClose} from "../internal";
import logger from "../internal/logger";
import {FileList} from "./Artifact/FileList";
import {BuildContext} from "./BuildContext";
import {BundleEntry} from "./BundleEntry";
import {DisposerStatic} from "./DisposerStatic";
import {IBundleScriptConfig} from "./interfaces";

export class BundleScript {
    readonly #entry: BundleEntry;
    readonly #fileList: FileList;
    readonly #config: IBundleScriptConfig;
    readonly #context: BuildContext;

    constructor(context: BuildContext, config: IBundleScriptConfig) {
        this.#config = config;
        this.#context = context;
        this.#entry = new BundleEntry(config);
        this.#fileList = new FileList(context, config);
    }

    public get id() {
        return this.#context.id;
    }

    public get args() {
        return this.#context.args;
    }

    public get config() {
        return this.#config;
    }

    public async build() {
        logger.info(this, "build");
        await this.prepare();
        await this.commit(await build(this.getBuildConfig()));
    }

    public async watch() {
        logger.info(this, "watch");
        const onRebuild = (error: BuildFailure | null, result: BuildResult | null): void => {
            if (result) this.commit(result);
            if (error) logger.error(this, error);
            logger.info(this, "rebuilt");
        };

        const options: BuildOptions = {
            ...this.getIncrementalConfig(),
            watch: {onRebuild},
        };

        await this.prepare();
        const buildResult = await build(options);
        await this.commit(buildResult);
        onClose(() => buildResult.stop?.());

        return defer<void>(onClose);
    }

    public async prepare() {
        if (this.#context.watch) {
            for (const file of this.#entry.getFileList()) {
                logger.info(this, "watch -> %s", relative(this.#context.base, file));
                const watcher = watch(file, async () => this.#entry.updateEntryPoints());
                DisposerStatic.add(() => watcher.close());
            }
        }

        const ops = [];
        for (const artifact of this.#entry.getArtifacts()) {
            logger.info(this, "prepare -> %s", artifact.name);
            ops.push(artifact.prepare(this));
        }

        ops.push(this.#fileList.copy());

        await Promise.all(ops);
    }

    public getIncrementalConfig(): BuildOptions & { incremental: true } {
        return {
            ...this.getBuildConfig(),
            incremental: true,
        };
    }

    public getBuildConfig(): BuildOptions {
        const {args} = this.#context;
        const {envFile} = this.#config;
        const define: Record<string, any> = {};

        const dotEnvVariables: DotenvParseOutput = {};
        const dotEnvFile = join(args.path, envFile ?? ".env");
        if (existsSync(dotEnvFile)) {
            const {parsed} = config({path: dotEnvFile});
            Object.assign(dotEnvVariables, parsed);
        }

        const {variables = {}, environment = [], loader = {}, plugins} = this.#config;
        const variableStore = {...variables, ...dotEnvVariables, ...process.env};
        const keys = new Set([...environment, ...Object.keys(variables)]);

        for (const variable of keys.values()) {
            define[variable] = JSON.stringify(variableStore[variable]);
        }

        define["process.env.NODE_ENV"] = define["NODE_ENV"] = JSON.stringify(args.mode);
        define["PRODUCTION"] = args.mode !== "development";
        define["DEVELOPMENT"] = !define["PRODUCTION"];

        const {sourcemap = args.isDevelopment, treeShaking = true, splitting = false} = this.#config;

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
            outdir: this.#config.build,
            outbase: this.#config.base,
            entryPoints: this.#entry.getEntryPoints(),
            tsconfig: join(args.path, "tsconfig.json"),
            bundle: true,
            minify: args.isProduction,
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
        for (const artifact of this.#entry.getArtifacts()) {
            logger.info(this, "commit -> %s", this.id, artifact.name);
            ops.push(artifact.commit(this, result));
        }

        await Promise.all(ops);
    }
}
