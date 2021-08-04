import {ok} from "assert";
import {Plugin} from "esbuild";
import * as fs from "fs";
import {join, sep} from "path";
import {PluginAbstract} from "../plugins";
import logger from "./logger";

const {paths} = module;
const modulePaths = new Map<string, string>();

export function isLocalResource(resource: string) {
    return !resource.startsWith("~");
}

export function isPackageResource(resource: string) {
    return !isLocalResource(resource);
}

export function getPackageName(resource: string) {
    ok(isPackageResource(resource), `This isn't package import: ${resource}`);

    return resource
        .split(sep, resource.startsWith("@") ? 2 : 1)
        .join(sep);
}

export function getModulePath(base: string) {
    let resolved = modulePaths.get(base);
    if (resolved) {
        return resolved;
    }

    for (const path of paths) {
        if (fs.existsSync(join(path, base))) {
            resolved = path;
            break;
        }
    }

    ok(resolved, `Module ${base} path not found`);
    modulePaths.set(base, resolved);

    return resolved;
}

export function getResourcePath(resource: string) {
    if (resource.includes("?") || resource.includes("#")) {
        resource = resource.replace(/(\?.+|#.+)/, "");
    }

    if (isLocalResource(resource)) {
        return resource;
    }

    if (resource.startsWith("~")) {
        resource = resource.substr(1);
    }

    const [base] = resource.split("/");
    const modulePath = getModulePath(base);
    return join(modulePath, resource);
}

export function isPluginCtor<C>(type: unknown): type is { new(config: C): PluginAbstract<C> } {
    return typeof type === "function" && type.isPrototypeOf(PluginAbstract);
}

export function assign<C extends Record<any, any>>(conf: C, ...configs: (Partial<C> | undefined)[]): C {
    return Object.assign({}, conf, ...configs);
}

export function load(id: string, config: unknown): Plugin {
    try {
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        const {default: plugin} = require(id);
        ok(isPluginCtor(plugin), `Wrong default export at ${id}`);

        return new plugin(config).getPluginConfig();
    } catch (error) {
        logger.error("[ %s ]", id, error);

        throw error;
    }
}
