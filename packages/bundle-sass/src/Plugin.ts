import {dirname, join, resolve} from "path";
import {stat, readFile} from "fs/promises";
import {
    assert,
    assignWithFilter,
    BuildContext,
    PluginAbstract,
    resolveThrough,
} from "@reform/bundle";
import {Options, render} from "node-sass";
import importer from "./importer";

export type Config = {filter: RegExp; compress?: boolean};
const stripRe = /[?#].+$/;
const cache = new Map();
const checkCache = async (path: string, drop: (key: string) => unknown) => {
    const ctime = cache.get(path) ?? new Date(0);
    const state = await stat(path);

    if (state.ctime > ctime) {
        cache.set(path, state.ctime);
        drop(path);
    }
};

export class Plugin extends PluginAbstract<Config> {
    public readonly name = "@reform/bundle-sass";

    constructor(context: BuildContext, config?: Config) {
        super(context, assignWithFilter({filter: /\.(scss|sass)$/}, config));
    }

    public configure(): void {
        const {filter, compress = false} = this.config;
        const fonts = ["eot", "ttf", "woff", "woff2", "svg"];
        this.context.addLoaders(fonts.map((font) => [font, "file"]));

        const filterFonts = new RegExp(`\\.(${fonts.join("|")})([?#].*)?$`);

        this
            .on("resolve", {filter: filterFonts}, async (args) => {
                const {fontPath, fontRealPath} = this.getFontPath(args.importer, args.path);

                return {
                    path: fontPath,
                    watchFiles: [fontRealPath],
                    pluginData: {fontRealPath},
                    namespace: "font",
                };
            })
            .on("load", {filter: filterFonts, namespace: "font"}, async ({pluginData: {fontRealPath: path}}) => {
                await checkCache(path, this.drop);
                const contents = await this.cache.store(path, () => readFile(path, null));

                return {
                    contents,
                    loader: "file",
                };
            })
            .on("load", {filter}, async ({path}) => {
                await checkCache(path, this.drop);
                const contents = await this.render({path, compress});

                return {contents, loader: "css"};
            });
    }

    private render(options: {path: string; compress?: boolean}) {
        const {context: {cache}} = this;
        const {path, compress} = options;

        return cache.store(path, async () => {
            const outputStyle = compress ? "compressed" : "expanded";

            const sassOptions: Options = {
                file: path,
                importer,
                outputStyle,
            };

            return new Promise<string>((resolve, reject) => {
                render(sassOptions, (error, result) => {
                    if (error) {
                        return reject(error);
                    }

                    resolve(result.css.toString("utf-8"));
                });
            });
        });
    }

    public getFontPath(importer: string, file: string) {
        const path = dirname(importer);
        const normalized = file.replace(stripRe, "");
        if (normalized.startsWith("~")) {
            const fontPath = normalized.substr(1);
            const fontRealPath = resolveThrough(path, join("node_modules", normalized.substr(1)));
            assert(fontRealPath, `Cannot find ${file} at ${path}`);

            return {fontPath, fontRealPath};
        }

        return {fontPath: normalized, fontRealPath: resolve(path, normalized)};
    }

    private drop = (key: string) => {
        this.cache.drop(key);
    };
}
