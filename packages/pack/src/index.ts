import {build} from "esbuild";
import {readFileSync, writeFileSync} from "fs";
import * as path from "path";
import ComponentResolverPlugin from "./plugins/ComponentResolverPlugin";
import SassLoaderPlugin from "./plugins/SassLoaderPlugin";

const cwd = process.cwd();
const dir = (file: string) => path.resolve(cwd, file);
const sassLoaderPlugin = new SassLoaderPlugin(/\.scss$/);

build({
    minify: false,
    target: ["es2020"],
    incremental: false,
    format: "esm",
    platform: "browser",
    splitting: true,
    outdir: dir("dist"),
    tsconfig: dir("tsconfig.json"),
    metafile: dir("dist/build.json"),
    bundle: true,
    sourcemap: true,
    treeShaking: true,
    entryPoints: [
        dir("src/index.tsx"),
    ],
    resolveExtensions: [".tsx", ".ts", ".js", ".scss", ".html"],
    plugins: [
        sassLoaderPlugin,
        new ComponentResolverPlugin(/^@reform/),
    ],
    define: {
        "process.env.NODE_ENV": JSON.stringify("development"),
    },
    loader: {
        ".ts": "ts",
        ".tsx": "tsx",
        ".scss": "css",
        ".json": "json",
        ".html": "file",
    },
})
    .catch((error) => {
        console.error(error);
        console.dir(error.errors);
    })
    .then(() => {
        sassLoaderPlugin.write(dir("./dist/index.css"));
        writeFileSync(dir("./dist/index.html"), readFileSync(dir("./src/index.html")));
    });
