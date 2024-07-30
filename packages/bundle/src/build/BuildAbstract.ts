import {IArgumentList} from "../internal/index.js";
import logger from "../internal/logger.js";
import {BundleScript} from "./BundleScript.js";

export abstract class BuildAbstract {
    public readonly args: IArgumentList;

    public readonly bundleScriptList: BundleScript[];

    constructor(args: IArgumentList, bundleConfigList: BundleScript[]) {
        this.args = args;
        this.bundleScriptList = bundleConfigList;

        logger.debug(
            this,
            "run -> %o",
            ...bundleConfigList.map(({id, config: {base, build, entry}}) => [
                {
                    id,
                    entry,
                    base: base.relative,
                    build: build.relative,
                },
            ]),
        );
    }

    public start(): Promise<void> {
        if (this.args.watch) {
            return this.watch();
        }

        return this.build();
    }

    public async build(): Promise<void> {
        logger.info(this, "building...");

        const ops: Promise<void>[] = [];
        for (const bundleScript of this.bundleScriptList) {
            ops.push(bundleScript.build());
        }

        await Promise.all(ops);

        logger.info(this, "done");
    }

    public async watch(): Promise<void> {
        logger.info(this, "watching...");

        const ops: Promise<void>[] = [];
        for (const bundleScript of this.bundleScriptList) {
            ops.push(bundleScript.watch());
        }

        await Promise.all(ops);

        logger.info(this, "done");
    }
}
