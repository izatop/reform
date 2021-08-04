import {PluginAbstract} from "@reform/bundle";
import {PluginBuild} from "esbuild";
import * as sass from "sass";
import importer from "./importer";

export type PluginConfig = { filter: RegExp; compress?: boolean };

export const DefaultConfig: PluginConfig = {filter: /\.(scss|sass)$/};

export class Plugin extends PluginAbstract<PluginConfig> {
    constructor(config = DefaultConfig) {
        super(config);
    }

    protected connect(build: PluginBuild): void {
        const {filter, compress = false} = this.config;

        build.onLoad({filter}, async (args) => {
            try {
                return {
                    contents: await this.render({file: args.path, compress}),
                    loader: "css",
                };
            } catch (error) {
                return {errors: [error]};
            }
        });
    }

    private render(options: { file?: string; data?: string; compress?: boolean }) {
        return new Promise<string>((resolve, reject) => {
            const {file, data, compress} = options;
            const sassOptions: sass.Options = {
                file,
                data,
                importer,
                outputStyle: compress ? "compressed" : "expanded",
            };

            sass.render(sassOptions, (error, result) => {
                if (error) {
                    return reject(error);
                }

                resolve(result.css.toString("utf-8"));
            });
        });
    }
}
