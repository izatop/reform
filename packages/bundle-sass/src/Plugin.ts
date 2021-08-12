import {assignWithFilter, PluginAbstract} from "@reform/bundle";
import {BuildContext} from "@reform/bundle/dist/build/BuildContext";
import {PluginBuild} from "esbuild";
import {Options, render} from "node-sass";
import importer from "./importer";

export type Config = { filter: RegExp; compress?: boolean };

export class Plugin extends PluginAbstract<Config> {
    constructor(context: BuildContext, config?: Config) {
        super(context, assignWithFilter({filter: /\.(scss|sass)$/}, config));
    }

    protected connect(build: PluginBuild): void {
        const {filter, compress = false} = this.config;

        build.onLoad({filter}, async (args) => {
            try {
                const contents = await this.render({file: args.path, compress});

                return {contents, loader: "css"};
            } catch (error) {
                return {errors: [error]};
            }
        });
    }

    private render(options: { file: string; compress?: boolean }) {
        const {context: {cache}} = this;
        const {file, compress} = options;

        return cache.store(file, async () => {
            const outputStyle = compress ? "compressed" : "expanded";

            const sassOptions: Options = {
                file,
                importer,
                outputStyle,
            };

            return new Promise((resolve, reject) => {
                render(sassOptions, (error, result) => {
                    if (error) {
                        return reject(error);
                    }

                    const css = result.css.toString("utf-8");
                    resolve(css);
                });
            });
        });
    }
}
