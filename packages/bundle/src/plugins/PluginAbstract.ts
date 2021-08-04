import {Plugin, PluginBuild} from "esbuild";

export abstract class PluginAbstract<TConfig> {
    protected readonly config: TConfig;

    public constructor(config: TConfig) {
        this.config = config;
    }

    public get name() {
        return this.constructor.name;
    }

    public getPluginConfig(): Plugin {
        return {
            name: this.name,
            setup: (build: PluginBuild): void => this.connect(build),
        };
    }

    protected abstract connect(build: PluginBuild): void;
}
