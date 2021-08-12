import {Plugin, PluginBuild} from "esbuild";
import {BuildContext} from "../build/BuildContext";

export type PluginCtor<C, P extends PluginAbstract<C>> = {
    new(context: BuildContext, config: C): P;
    prototype: PluginAbstract;
};

export abstract class PluginAbstract<TConfig extends (Record<any, any> | undefined) = undefined> {
    protected readonly context: BuildContext;
    protected readonly config: TConfig;

    constructor(context: BuildContext, config: TConfig) {
        this.context = context;
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
