import {assignWithFilter, PluginAbstract} from "@reform/bundle";
import {PluginBuild} from "esbuild";
import {Options, render} from "node-sass";
import importer from "./importer";

export type Config = { filter: RegExp; compress?: boolean };

export class Plugin extends PluginAbstract<Config> {
    readonly #cache = new Map<string, string>();
    readonly #watches = new Map<string, string>();

    constructor(config?: Config) {
        super(assignWithFilter({filter: /\.(scss|sass)$/}, config));
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
        const {file, compress} = options;

        return this.store(file, async () => {
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
