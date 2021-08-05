import {assignWithFilter, DisposerStatic, PluginAbstract} from "@reform/bundle";
import {PluginBuild} from "esbuild";
import {unwatchFile, watch} from "fs";
import * as sass from "node-sass";
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
                return {
                    contents: await this.render({file: args.path, compress}),
                    loader: "css",
                };
            } catch (error) {
                return {errors: [error]};
            }
        });
    }

    private render(options: { file: string; compress?: boolean }) {
        return new Promise<string>((resolve, reject) => {
            const {file, compress} = options;

            const outputStyle = compress ? "compressed" : "expanded";
            const cacheKey = `${file}:${outputStyle}`;
            const cache = this.#cache.get(cacheKey);
            if (cache) {
                this.watch(file, cacheKey);
                return cache;
            }

            const sassOptions: sass.Options = {
                file,
                importer,
                outputStyle,
            };

            sass.render(sassOptions, (error, result) => {
                if (error) {
                    return reject(error);
                }

                const css = result.css.toString("utf-8");
                this.#cache.set(cacheKey, css);
                resolve(css);
            });
        });
    }

    private watch(file: string, key: string) {
        if (this.#watches.has(key)) {
            watch(file, (state) => {
                if (state === "rename") {
                    return unwatchFile(file);
                }

                this.#cache.delete(key);
            });

            DisposerStatic.dispose(() => unwatchFile(file));
        }
    }
}
