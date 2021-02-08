import {PluginBuild} from "esbuild";
import {PackageComponent} from "../../package";
import {PluginAbstract} from "../PluginAbstract";

export class ResourceResolver extends PluginAbstract<{ filter: RegExp }> {
    protected connect(build: PluginBuild): void {
        const {filter} = this.config;
        build.onResolve({filter}, (args) => {
            return PackageComponent.resolve(args.path);
        });
    }
}

export default ResourceResolver;
