import {assignWithFilter, PluginAbstract, BuildContext, File, assert} from "@reform/bundle";
import {existsSync} from "fs";
import {dirname, resolve} from "path";

export type Config = {filter: RegExp};

// eslint-disable-next-line @typescript-eslint/no-var-requires
const loader = require("graphql-tag/loader");
const toQuery = (file: File<string>) => loader.call({cacheable: () => void 0}, file.contents);

const extensions = ["gql", "graphql"];
const defaultFilter = new RegExp(`\.(${extensions.join("|")})$`);
const importsRe = /#\s*import ['"]?([0-9a-z_-]+)['"]?/ig;

const resolveImport = (dir: string, name: string) => {
    const real = extensions
        .map((ext) => resolve(dir, `${name}.${ext}`))
        .find((file) => existsSync(file));

    assert(real, `Cannot resolve ${name} at ${dir}`);

    return real;
};

const parseImports = (file: File<string>): File<string> => {
    if (file.includes("import")) {
        return file.transform((raw) => raw.replace(importsRe, (...[, name]) => {
            return `#import '${resolveImport(file.dir, name)}'`;
        }));
    }

    return file;
};

export class Plugin extends PluginAbstract<Config> {
    public readonly name = "@reform/bundle-graphql";

    constructor(context: BuildContext, config?: Config) {
        super(context, assignWithFilter({filter: defaultFilter}, config));
    }

    public configure(): void {
        const {context: {cache, base: {fileFactory}}} = this;

        this
            .on("load", this.config, async (args) => {
                const file = this.getRelativePath(args.path);
                const contents = await cache.store(
                    file,
                    async () => fileFactory
                        .read(file, "utf-8")
                        .then(parseImports)
                        .then(toQuery),
                );

                return {contents, loader: "js", resolveDir: dirname(args.path)};
            });
    }
}
