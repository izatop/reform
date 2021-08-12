import {BuildAbstract, BuildScript, BuildServer, BundleScript, DisposerStatic, JSONConfig} from "../build";
import {getArgumentList, IArgumentList} from "./args";
import logger from "./logger";

export function factory(args: IArgumentList, bundleConfigList: BundleScript[]): BuildAbstract {
    if (args.serve) {
        return new BuildServer(args, bundleConfigList);
    }

    return new BuildScript(args, bundleConfigList);
}

export async function main(root?: string) {
    let code = 0;

    try {
        const args = getArgumentList(root);
        
        logger.info("main", "args: %o", process.argv.slice(2));
        const bundleScriptList: BundleScript[] = [];
        const jsonConfig = new JSONConfig(args);

        for (const {context, config} of jsonConfig.getBundleArgs()) {
            bundleScriptList.push(new BundleScript(context, config));
        }

        const service = factory(args, bundleScriptList);
        await service.start();
    } catch (error) {
        logger.error("main", error);
        code = 1;
    }

    DisposerStatic.dispose();
    logger.info("main", "exit(%d)", code);
    setImmediate(() => process.exit(code));
}
