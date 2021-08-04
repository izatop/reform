import * as fs from "fs";
import * as path from "path";
import {BuildAbstract, BuildScript, BuildServer, BundleScript, JSONConfig} from "../build";
import {getArgumentList, IArgumentList} from "./args";
import logger from "./logger";

export function factory(args: IArgumentList, bundleConfigList: BundleScript[]): BuildAbstract {
    if (args.serve) {
        return new BuildServer(args, bundleConfigList);
    }

    return new BuildScript(args, bundleConfigList);
}

export async function main() {
    try {
        const args = getArgumentList();
        const configPath = path.join(args.path, "bundle.json");
        const bundleConfigList: BundleScript[] = [];
        if (fs.existsSync(configPath)) {
            bundleConfigList.push(
                ...new JSONConfig(args, configPath).getBundleScriptList(),
            );
        }

        const service = factory(args, bundleConfigList);
        if (args.watch) {
            await service.watch();
            return;
        }

        await service.build();
    } catch (error) {
        logger.error(error);
    }
}
