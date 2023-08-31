import {assert, assignWithFilter, BuildContext, PluginAbstract, resolveThrough} from "@reform/bundle";
import {Options, render} from "node-sass";
import {dirname, join} from "path";

import importer from "./importer";

export type Config = {filter: RegExp; resolves?: string[]; compress?: boolean};
const stripRe = /[?#].+$/;

export class Plugin extends PluginAbstract<Config> {
    public readonly name = "@reform/bundle-sass";

    constructor(context: BuildContext, config?: Config) {
        super(context, assignWithFilter({filter: /\.(scss|sass)$/}, config));
    }

    public configure(): void {
        const {filter, resolves = ["eot", "ttf", "woff", "woff2", "svg"], compress = false} = this.config;
        const resolvesRegex = new RegExp(`^~.+\\.(${resolves.join("|")})([?#].*)?$`);

        this.context.addLoaders(resolves.map((extension) => [extension, "file"]));

        this
            .on("resolve", {filter: resolvesRegex}, (args) => {
                const path = this.getModulePath(args.importer, args.path);

                return {path};
            })
            .on("load", {filter}, async ({path}) => {
                const {contents, watchFiles} = await this.render({path, compress});

                return {contents, watchFiles, loader: "css"};
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

            return new Promise<{contents: string; watchFiles: string[]}>((resolve, reject) => {
                render(sassOptions, (error, result) => {
                    if (error) {
                        return reject(error);
                    }

                    const watchFiles = [
                        result.stats.entry,
                        ...result.stats.includedFiles,
                    ];

                    const contents = result.css.toString("utf-8");

                    resolve({contents, watchFiles});
                });
            });
        });
    }

    public getModulePath(importer: string, file: string) {
        const path = dirname(importer);
        const normalized = file.replace(stripRe, "");
        const fontRealPath = resolveThrough(path, join("node_modules", normalized.substring(1)));
        assert(fontRealPath, `Cannot find ${file} at ${path}`);

        return fontRealPath;
    }
}
