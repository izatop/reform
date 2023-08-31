import {Build, BuildAbstract, BundleScript} from "../build";
import {JSONConfig} from "../config";
import {getArgumentList, IArgumentList} from "./args";
import {Disposer} from "./disposer";
import {withError} from "./error";
import logger from "./logger";

export function factory(args: IArgumentList, bundleConfigList: BundleScript[]): BuildAbstract {
    return new Build(args, bundleConfigList);
}

export function exit(code: number) {
    Disposer.dispose();
    logger.info("main", "exit(%d)", code);
    if (process.env.NODE_ENV !== "test") {
        setImmediate(() => process.exit(code));
    }
}

export async function cli(root?: string) {
    try {
        const args = getArgumentList(root);

        logger.debug("cli", "args: %o", process.argv.slice(2));
        const bundleScriptList: BundleScript[] = [];
        const jsonConfig = new JSONConfig(args);

        const configList = [];
        for await (const config of jsonConfig.getBundleArgs()) {
            configList.push(config);
        }

        if (args.print) {
            logger.info("cli", "config %o", configList.map(({config}) => config));

            exit(0);
        }

        for (const {context, config} of configList) {
            bundleScriptList.push(new BundleScript(context, config));
        }

        const service = factory(args, bundleScriptList);
        await service.start();
        exit(0);
    } catch (error) {
        logger.error(withError(error, (e) => e, () => new Error("Unknown error")), "cli", "unexpected");
        exit(1);
    }
}
