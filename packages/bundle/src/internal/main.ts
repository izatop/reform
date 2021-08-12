import {BuildAbstract, BuildScript, BuildServer, BundleScript, DisposerStatic, JSONConfig} from "../build";
import {getArgumentList, IArgumentList} from "./args";
import logger from "./logger";

export function factory(args: IArgumentList, bundleConfigList: BundleScript[]): BuildAbstract {
    if (args.serve) {
        return new BuildServer(args, bundleConfigList);
    }

    return new BuildScript(args, bundleConfigList);
}

export function exit(code: number) {
    DisposerStatic.dispose();
    logger.info("main", "exit(%d)", code);
    if (process.env.NODE_ENV !== "test") {
        setImmediate(() => process.exit(code));
    }
}

export async function main(root?: string) {
    try {
        const args = getArgumentList(root);

        logger.info("main", "args: %o", process.argv.slice(2));
        const bundleScriptList: BundleScript[] = [];
        const jsonConfig = new JSONConfig(args);

        if (args.print) {
            logger.info(
                "main",
                "config %o",
                [...jsonConfig.getBundleArgs()]
                    .map(({config}) => config),
            );

            exit(0);
        }

        for (const {context, config} of jsonConfig.getBundleArgs()) {
            bundleScriptList.push(new BundleScript(context, config));
        }

        const service = factory(args, bundleScriptList);
        await service.start();
        exit(0);
    } catch (error) {
        logger.error("main", error);
        exit(1);
    }
}
