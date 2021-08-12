import {relative} from "path/posix";
import {IArgumentList} from "../internal";
import logger from "../internal/logger";
import {BundleScript} from "./BundleScript";

export abstract class BuildAbstract {
    public readonly args: IArgumentList;
    public readonly bundleScriptList: BundleScript[];

    constructor(args: IArgumentList, bundleConfigList: BundleScript[]) {
        this.args = args;
        this.bundleScriptList = bundleConfigList;

        logger.info(
            this,
             "run -> %o", 
            ...bundleConfigList.map(
                ({id, config: {base, build, entry}}) => [
                    {
                        id,
                        base: relative(args.path, base),
                        build: relative(args.path, build),
                        entry: entry.map((e) => relative(args.path, e)),
                    },
                ],
            ),
        );
    }

    public abstract before(): Promise<void>;

    public abstract after(): Promise<void>;

    public async start() {
        if (this.args.watch) {
            return this.watch();
        }

        return this.build();
    }

    public async build() {
        logger.info(this, "build");

        await this.before();
        const ops: Promise<void>[] = [];
        for (const bundleScript of this.bundleScriptList) {
            ops.push(bundleScript.build());
        }

        await Promise.all(ops);
        await this.after();

        logger.info(this, "done");
    }

    public async watch() {
        logger.info(this, "watch");

        await this.before();
        const ops: Promise<void>[] = [];
        for (const bundleScript of this.bundleScriptList) {
            ops.push(bundleScript.watch());
        }

        await Promise.all(ops);
        await this.after();

        logger.info(this, "done");
    }
}
