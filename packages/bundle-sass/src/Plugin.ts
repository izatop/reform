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

export class Plugin extends PluginAbstract<Config> {
    public readonly name = "@reform/bundle-sass";

    constructor(context: BuildContext, config?: Config) {
        super(context, assignWithFilter({filter: /\.(scss|sass)$/}, config));
    }

    public configure(): void {
        const {filter, compress = false} = this.config;
        const fonts = ["eot", "ttf", "woff", "woff2", "svg"];
        this.context.addLoaders(fonts.map((font) => [font, "file"]));

        const cache = new Map();
        const filterFonts = new RegExp(`\\.(${fonts.join("|")})([?#].*)?$`);

        const checkCache = async (path: string) => {
            const ctime = cache.get(path) ?? new Date(0);
            const state = await stat(path);

            if (state.ctime > ctime) {
                cache.set(path, state.ctime);
                this.cache.drop(path);
            }
        };

        this
            .on("resolve", {filter: filterFonts}, async (args) => {
                const fontPath = this.getFontPath(args.importer, args.path);

                return {
                    path: fontPath,
                    watchFiles: [fontPath],
                    namespace: "font",
                };
            })
            .on("load", {filter: filterFonts, namespace: "font"}, async ({path}) => {
                await checkCache(path);
                const contents = await this.cache.store(path, () => readFile(path, {encoding: "binary"}));

                return {
                    contents,
                    loader: "file",
                };
            })
            .on("load", {filter}, async ({path}) => {
                await checkCache(path);
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
            const modulePath = resolveThrough(path, join("node_modules", normalized.substr(1)));
            assert(modulePath, `Cannot find ${file} at ${path}`);

            return modulePath;
        }

        return resolve(path, normalized);
    }
}
