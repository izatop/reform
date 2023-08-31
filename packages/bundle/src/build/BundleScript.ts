import {DotenvParseOutput, parse} from "dotenv";
import {build, BuildOptions, context} from "esbuild";
import {readFileSync} from "fs";

import {
    assert,
    defer,
    entries,
    fromEntries,
    keys,
    mutate,
    onClose,
    resolveThrough,
} from "../internal/index.js";
import logger from "../internal/logger.js";
import {BuildContext} from "./BuildContext.js";
import {IBundleScriptConfig} from "./interfaces.js";

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
        const bundle = await context(this.getBuildConfig());

        await this.check();
        await Promise.all([
            bundle.watch({}),
            files.build(),
        ]);

        onClose(() => bundle.dispose());

        if (this.config.serve) {
            const {serve: {host, port}, build} = this.config;
            logger.info(this, "serve (%o)", {host, port});
            await bundle.serve({host, port, servedir: build.path});
        }

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

    private getBuildConfig(): BuildOptions {
        const {args} = this.#context;
        const define: Record<string, any> = {};
        const dotEnvVariables: DotenvParseOutput = {};

        const {
            id,     // eslint-disable-line
            base,   // eslint-disable-line
            build,  // eslint-disable-line
            serve,  // eslint-disable-line
            files,  // eslint-disable-line
            bundle = true,
            loader = {},
            paths = {},
            plugins,
            sourcemap = args.isDevelopment,
            variables = {},
            environment = [],
            envFiles = [],
            jsx = {},
            entry: {paths: entryPoints},
            ...options
        } = this.#config;

        const {path: envBasePath} = this.config.base;
        for (const envFile of envFiles) {
            const dotEnvFile = resolveThrough(envBasePath, envFile);
            if (dotEnvFile) {
                const dotEnvContents = readFileSync(dotEnvFile, {encoding: "utf-8"});
                mutate(dotEnvVariables, parse(dotEnvContents));

                logger.debug(this, "env -> %s, %o", envFile, dotEnvVariables);
            }
        }

        const variableStore = {...variables, ...dotEnvVariables, ...process.env};
        const uniqueKeys = new Set([...environment, ...keys(variables)]);

        for (const variable of uniqueKeys.values()) {
            define[variable] = JSON.stringify(variableStore[variable] ?? null);
        }

        define["process.env.NODE_ENV"] = define["NODE_ENV"] = JSON.stringify(args.mode);
        define["PRODUCTION"] = JSON.stringify(args.mode !== "development");
        define["DEVELOPMENT"] = JSON.stringify(!define["PRODUCTION"]);

        return {
            define,
            bundle,
            plugins,
            sourcemap,
            entryPoints,
            jsx: jsx.jsx,
            jsxDev: jsx.dev,
            jsxFactory: jsx.factory,
            jsxFragment: jsx.fragment,
            jsxImportSource: jsx.importSource,
            jsxSideEffects: jsx.sideEffects,
            entryNames: paths.entry,
            chunkNames: paths.chunk,
            assetNames: paths.asset,
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
