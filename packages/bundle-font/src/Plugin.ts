import {assignWithFilter, BuildContext, File, getResourcePath, PluginAbstract} from "@reform/bundle";

export type Config = {filter: RegExp};

export class Plugin extends PluginAbstract<Config> {
    public readonly name = "@reform/bundle-sass";

    constructor(context: BuildContext, config?: Config) {
        super(context, assignWithFilter({filter: /\.(eot|ttf|woff|woff2?|svg)([?|#].+)?$/}, config));
    }

    protected configure(): void {
        const {context: {cache, base}} = this;
        const {fileFactory} = base;

        this
            .on("resolve", this.config, (args) => {
                return {
                    path: getResourcePath(args.path),
                    namespace: "font",
                };
            })
            .on("load", {namespace: "font", filter: /^./}, async (args) => {
                const relativePath = this.getRelativePath(args.path);
                const {contents} = await cache.store<File<Buffer>>(relativePath, fileFactory.read);

                return {
                    contents,
                    loader: "file",
                };
            });
    }
}
