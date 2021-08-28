import {assert, assignWithFilter, BuildContext, PluginAbstract, resolveThrough} from "@reform/bundle";
import {Options, render} from "node-sass";
import {dirname, join, resolve} from "path";
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

        this
            .on("resolve", {filter: new RegExp(`\.(${fonts.join("|")})([?#].*)?$`)}, (args) => {
                return {path: this.normalize(args.importer, args.path)};
            })
            .on("load", {filter}, async ({path}) => {
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

    public normalize(importer: string, file: string) {
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
