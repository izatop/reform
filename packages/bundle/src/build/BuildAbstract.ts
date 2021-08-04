import {build, BuildFailure, BuildOptions, BuildResult} from "esbuild";
import {IArgumentList} from "../internal";
import logger from "../internal/logger";
import {BundleScript} from "./BundleScript";

export abstract class BuildAbstract {
    public readonly args: IArgumentList;
    public readonly bundleScriptList: BundleScript[];

    constructor(args: IArgumentList, bundleConfigList: BundleScript[]) {
        this.args = args;
        this.bundleScriptList = bundleConfigList;
        logger.info("run builds { count: %d }", bundleConfigList.length);
    }

    public abstract before(): Promise<void>;

    public abstract after(): Promise<void>;

    public async build() {
        await this.before();
        const ops: Promise<void>[] = [];
        for (const bundleScript of this.bundleScriptList) {
            logger.info("building: ", bundleScript.id);
            ops.push(
                bundleScript.prepare(),
                build(bundleScript.getBuildConfig())
                    .then((result) => bundleScript.commit(result)),
            );
        }

        await Promise.all(ops);
        await this.after();

        logger.info("build: finish");
    }

    public async watch() {
        await this.before();
        const ops: Promise<void>[] = [];
        for (const bundleScript of this.bundleScriptList) {
            logger.info("watching: ", bundleScript.id);
            const onRebuild = (error: BuildFailure | null, result: BuildResult | null): void => {
                if (result) bundleScript.commit(result);
                if (error) logger.error(error);

                logger.info("rebuild: done");
            };

            const options: BuildOptions & { incremental: true } = {
                ...bundleScript.getIncrementalConfig(),
                watch: {onRebuild},
            };

            ops.push(
                bundleScript.prepare(),
                build(options)
                    .then((result) => bundleScript.commit(result)),
            );
        }

        await Promise.all(ops);
        await this.after();

        logger.info("build: done");
    }
}
