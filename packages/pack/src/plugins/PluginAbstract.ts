import {Plugin, PluginBuild} from "esbuild";

export abstract class PluginAbstract implements Plugin {
    public readonly name: string;

    constructor(name: string) {
        this.name = name;
    }

    public setup = (build: PluginBuild): void => this.connect(build);

    protected abstract connect(build: PluginBuild): void;
}
