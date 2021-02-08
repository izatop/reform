import {BuildIncremental, BuildResult, startService} from "esbuild";
import {IArgumentList} from "../internal";
import {BundleScript} from "./BundleScript";
import {DisposerStatic} from "./DisposerStatic";

export abstract class BuildAbstract {
    public readonly args: IArgumentList;
    public readonly bundleScriptList: BundleScript[];

    constructor(args: IArgumentList, bundleConfigList: BundleScript[]) {
        this.args = args;
        this.bundleScriptList = bundleConfigList;
    }

    public abstract before(): Promise<void>;

    public abstract after(): Promise<void>;

    public async build() {
        await this.before();
        const ops: Promise<BuildResult>[] = [];
        const service = await this.createService();
        for (const bundleScript of this.bundleScriptList) {
            ops.push(
                service.build(bundleScript.getBuildConfig())
                    .finally(() => bundleScript.commit()),
            );
        }

        await Promise.all(ops);
        service.stop();
        await this.after();
    }

    public async watch() {
        await this.before();
        const ops: Promise<BuildIncremental>[] = [];
        const service = await this.createService();
        for (const bundleScript of this.bundleScriptList) {
            const options = {
                ...bundleScript.getIncrementalConfig(),
                watch: {onRebuild: () => bundleScript.commit()},
            };

            ops.push(
                service.build(options)
                    .finally(() => bundleScript.commit()),
            );
        }

        await Promise.all(ops);
        await this.after();
    }

    private async createService() {
        const service = await startService();
        DisposerStatic.dispose(() => service.stop());

        return service;
    }
}
