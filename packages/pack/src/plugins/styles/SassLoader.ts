import {PluginBuild} from "esbuild";
import * as sass from "node-sass";
import {PluginAbstract} from "../PluginAbstract";
import importer from "./sass/importer";

export class SassLoader extends PluginAbstract<{ filter: RegExp; compress?: boolean }> {
    constructor(config = {filter: /\.scss$/}) {
        super(config);
    }

    public render(options: { file?: string, data?: string, compress?: boolean }) {
        return new Promise<string>((resolve, reject) => {
            const {file, data, compress} = options;
            sass.render({
                file,
                data,
                importer,
                outputStyle: compress ? "compressed" : "expanded",
            }, (error, result) => {
                if (error) {
                    return reject(error);
                }

                resolve(result.css.toString("utf-8"));
            });
        });
    }

    protected connect(build: PluginBuild): void {
        const {filter, compress = false} = this.config;
        build.onLoad({filter}, async (args) => {
            return {
                contents: await this.render({file: args.path, compress}),
                loader: "css",
            };
        });
    }
}

export default SassLoader;
