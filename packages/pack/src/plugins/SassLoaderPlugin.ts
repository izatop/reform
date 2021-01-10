import {PluginBuild} from "esbuild";
import {writeFileSync} from "fs";
import * as sass from "sass";
import {PluginAbstract} from "./PluginAbstract";
import importer from "./sass/importer";

class SassLoaderPlugin extends PluginAbstract {
    readonly #filter: RegExp;
    readonly #fileList: string[];
    readonly #fileSet = new Set<string>();

    constructor(filter: RegExp = /\.scss$/, initial: string[] = []) {
        super("sass");
        this.#filter = filter;
        this.#fileList = initial;
    }

    public write(file: string) {
        const files = this.#fileList.map((file) => `@import "${file}";`);
        const out = sass.renderSync({
            outputStyle: "compressed",
            data: `${files.join("\n")}`,
            importer,
        });

        writeFileSync(file, out.css, {encoding: "utf-8"});
    }

    protected connect(build: PluginBuild): void {
        build.onLoad({filter: this.#filter}, (({path}) => {
            if (!this.#fileSet.has(path)) {
                this.#fileSet.add(path);
                this.#fileList.push(path);
            }

            return {loader: "css", contents: ""};
        }));
    }
}

export default SassLoaderPlugin;
