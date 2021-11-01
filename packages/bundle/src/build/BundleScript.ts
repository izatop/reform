import {config, DotenvParseOutput} from "dotenv";
import {build, BuildFailure, BuildOptions} from "esbuild";
import {
    assert, assign, defer, entries, fromEntries, onClose, resolveThrough,
} from "../internal";
import logger from "../internal/logger";
import {BuildContext} from "./BuildContext";
import {IBundleScriptConfig} from "./interfaces";

export class BundleScript {
    readonly #config: IBundleScriptConfig;
    readonly #context: BuildContext;

    constructor(context: BuildContext, config: IBundleScriptConfig) {
        this.#config = config;
        this.#context = context;
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

        const {files} = this.#config;

        await this.check();
        await Promise.all([
            build(this.getBuildConfig()),
            files.build(),
        ]);
    }

    public async watch() {
        logger.info(this, "watch");

        const {files} = this.#config;
        const onRebuild = async (error: BuildFailure | null) => {
            if (error) {logger.error(error, this, "watch -> %s", error.message);}

            logger.info(this, "rebuilt");
        };

        const options: BuildOptions = {
            ...this.getIncrementalConfig(),
            watch: {onRebuild},
        };

        await this.check();
        const [buildResult] = await Promise.all([
            build(options),
            files.build(),
        ]);

        onClose(() => buildResult.stop?.());

        return defer<void>(onClose);
    }

    private async check() {
        const {entry} = this.config;
        const errors = await entry.check();
        if (errors.length) {
            for (const {error, file} of errors) {
                logger.error(error, this, "file -> %s", file);
            }
        }

        assert(!errors.length, "Wrong entries");
    }

    private getIncrementalConfig(): BuildOptions & {incremental: true} {
        return {
            ...this.getBuildConfig(),
            incremental: true,
        };
    }

    private getBuildConfig(): BuildOptions {
        const {args} = this.#context;
        const {envFile} = this.#config;
        const define: Record<string, any> = {};

        const dotEnvFile = resolveThrough(args.path, envFile ?? ".env");
        const dotEnvVariables: DotenvParseOutput = dotEnvFile
            ? assign({}, config({path: dotEnvFile}).parsed)
            : {};

        const {
            id,     // eslint-disable-line
            base,   // eslint-disable-line
            build,  // eslint-disable-line
            serve,  // eslint-disable-line
            files,  // eslint-disable-line
            bundle = true,
            loader = {},
            plugins,
            sourcemap = args.isDevelopment,
            variables = {},
            environment = [],
            entry: {paths: entryPoints},
            ...options
        } = this.#config;

        const variableStore = {...variables, ...dotEnvVariables, ...process.env};
        const keys = new Set([...environment, ...Object.keys(variables)]);

        for (const variable of keys.values()) {
            define[variable] = JSON.stringify(variableStore[variable]);
        }

        define["process.env.NODE_ENV"] = define["NODE_ENV"] = JSON.stringify(args.mode);
        define["PRODUCTION"] = args.mode !== "development";
        define["DEVELOPMENT"] = !define["PRODUCTION"];

        return {
            define,
            bundle,
            plugins,
            sourcemap,
            entryPoints,
            entryNames: "build/[name].[hash]",
            chunkNames: "build/chunk/[name].[hash]", // @todo
            assetNames: "build/asset/[name].[hash]", // @todo
            publicPath: "/",
            minify: args.isProduction,
            outdir: this.#config.build.path,
            outbase: this.#config.base.path,
            metafile: true,
            tsconfig: resolveThrough(args.path, "tsconfig.json"),
            loader: fromEntries(...this.#context.getLoaders(), ...entries(loader)),
            ...options,
        };
    }
}
