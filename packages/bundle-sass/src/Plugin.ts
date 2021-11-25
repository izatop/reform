import {dirname, join} from "path";
import {stat} from "fs/promises";
import {
    assert,
    assignWithFilter,
    BuildContext,
    PluginAbstract,
    resolveThrough,
} from "@reform/bundle";
import {Options, render} from "node-sass";
import importer from "./importer";

export type Config = {filter: RegExp; resolves?: string[]; compress?: boolean};
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
        const {filter, resolves = ["eot", "ttf", "woff", "woff2", "svg"], compress = false} = this.config;
        this.context.addLoaders(resolves.map((extension) => [extension, "file"]));

        const resolvesRegex = new RegExp(`^~.+\\.(${resolves.join("|")})([?#].*)?$`);

        this
            .on("resolve", {filter: resolvesRegex}, (args) => (
                {path: this.getModulePath(args.importer, args.path)}
            ))
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

    public getModulePath(importer: string, file: string) {
        const path = dirname(importer);
        const normalized = file.replace(stripRe, "");
        const fontRealPath = resolveThrough(path, join("node_modules", normalized.substr(1)));
        assert(fontRealPath, `Cannot find ${file} at ${path}`);

        return fontRealPath;
    }

    private drop = (key: string) => {
        this.cache.drop(key);
    };
}
