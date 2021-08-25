import {IArgumentList} from "../internal";
import logger from "../internal/logger";
import {BundleScript} from "./BundleScript";

export abstract class BuildAbstract {
    public readonly args: IArgumentList;
    public readonly bundleScriptList: BundleScript[];

    constructor(args: IArgumentList, bundleConfigList: BundleScript[]) {
        this.args = args;
        this.bundleScriptList = bundleConfigList;

        logger.debug(
            this, "run -> %o", ...bundleConfigList.map(
                ({id, config: {base, build, entry}}) => [
                    {
                        id,
                        entry,
                        base: base.relative,
                        build: build.relative,
                    },
                ],
            ),
        );
    }

    public start() {
        if (this.args.watch) {
            return this.watch();
        }

        return this.build();
    }

    public async build() {
        logger.info(this, "building...");

        const ops: Promise<void>[] = [];
        for (const bundleScript of this.bundleScriptList) {
            ops.push(bundleScript.build());
        }

        await Promise.all(ops);

        logger.info(this, "done");
    }

    public async watch() {
        logger.info(this, "watching...");

        const ops: Promise<void>[] = [];
        for (const bundleScript of this.bundleScriptList) {
            ops.push(bundleScript.watch());
        }

        await Promise.all(ops);

        logger.info(this, "done");
    }
}
