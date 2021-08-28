import {assignWithFilter, BuildContext, PluginAbstract} from "@reform/bundle";
import {Options, render} from "node-sass";
import importer from "./importer";

export type Config = {filter: RegExp; compress?: boolean};

export class Plugin extends PluginAbstract<Config> {
    public readonly name = "@reform/bundle-sass";

    constructor(context: BuildContext, config?: Config) {
        super(context, assignWithFilter({filter: /\.(scss|sass)$/}, config));
    }

    public configure(): void {
        const {filter, compress = false} = this.config;

        this.on("load", {filter}, async ({path}) => {
            const contents = await this.render({path, compress});

            return {contents, loader: "css"};
        });
    }

    private render(options: {path: string; compress?: boolean}) {
        const {context: {cache}} = this;
        const {path, compress} = options;
        const relativePath = this.getRelativePath(path);

        return cache.store(relativePath, async () => {
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
}
