import {assign, BuildContext, PluginAbstract} from "@reform/bundle";

export type Config = {fonts: string[]};

export class Plugin extends PluginAbstract<Config> {
    public readonly name = "@reform/bundle-font";

    constructor(context: BuildContext, config?: Config) {
        super(context, assign({fonts: ["eot", "ttf", "woff", "woff2", "svg"]}, config));
    }

    public configure(): void {
        const {config: {fonts}} = this;
        this.context.addLoaders(fonts.map((ext) => [ext, "file"]));
    }
}
