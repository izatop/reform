import {Plugin, PluginBuild} from "esbuild";

export abstract class PluginAbstract<TConfig extends (Record<any, any> | undefined) = undefined> {
    protected readonly config: TConfig;

    constructor(config: TConfig) {
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
