import {assign, BuildContext, getResourcePath, PluginAbstract} from "@reform/bundle";

export type Config = {fonts: string[]};

export class Plugin extends PluginAbstract<Config> {
    public readonly name = "@reform/bundle-font";

    constructor(context: BuildContext, config?: Config) {
        super(context, assign({fonts: ["eot", "ttf", "woff", "woff2", "svg"]}, config));

        const {config: {fonts}} = this;
        this.context.addLoaders(fonts.map((ext) => [ext, "file"]));
    }

    protected configure(): void {
        const {config: {fonts}} = this;
        const filter = new RegExp(`\.(${fonts.join("|")})([?|#].+)?$`);

        this
            .on("resolve", {filter}, (args) => {
                return {
                    path: getResourcePath(args.path),
                };
            });
    }
}
