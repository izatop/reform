import {PluginBuild} from "esbuild";
import {PackageComponent} from "../package";
import {PluginAbstract} from "./PluginAbstract";

export class ComponentResolverPlugin extends PluginAbstract {
    readonly #filter: RegExp;

    constructor(filter: RegExp) {
        super("component-resolver");
        this.#filter = filter;
    }

    protected connect(build: PluginBuild): void {
        build.onResolve({filter: this.#filter}, async (args) => {
            const config = await PackageComponent.resolve(args.path);
            if (config) {
                return {path: config.getBuildPath()};
            }

            return null;
        });
    }
}

export default ComponentResolverPlugin;
