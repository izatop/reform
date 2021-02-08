import {Plugin, PluginBuild} from "esbuild";

export abstract class PluginAbstract<TConfig> {
    protected readonly config: TConfig;

    public constructor(config: TConfig) {
        this.config = config;
    }

    public get name() {
        return this.constructor.name;
    }

    public static getPluginName() {
        return this.prototype.name;
    }

    public getPluginConfig(): Plugin {
        return {
            setup: (build: PluginBuild): void => this.connect(build),
            name: this.name,
        };
    }

    protected abstract connect(build: PluginBuild): void;
}
