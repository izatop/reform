import * as fs from "fs";
import {join, sep} from "path";
import {assert} from "./assert";
import logger, {LogTarget} from "./logger";

const {paths} = module;
const modulePaths = new Map<string, string>();

export function isLocalResource(resource: string) {
    return !resource.startsWith("~");
}

export function isPackageResource(resource: string) {
    return !isLocalResource(resource);
}

export function getPackageName(resource: string) {
    assert(isPackageResource(resource), `This isn't package import: ${resource}`);

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

    assert(resolved, `Module ${base} path not found`);
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

export function trySafe(label: LogTarget, fn: () => unknown) {
    try {
        fn();
    } catch (error) {
        logger.error(label, error);
    }
}

const closeListeners: Array<() => void> = [];
export function onClose(fn: () => void) {
    closeListeners.push(fn);
}

process.on("SIGINT", (event) => {
    process.stdout.write("\r");
    logger.debug("main", "signal -> %s", event);
    closeListeners.forEach((fn) => fn());
});
