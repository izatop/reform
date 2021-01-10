import {promises} from "fs";
import {join, sep} from "path";
import {isFulfilled} from "./promise";
import assert = require("assert");

const {stat} = promises;
const {paths} = module;

export function isLocalResource(resource: string) {
    return resource.startsWith(".") || resource.startsWith("/") || resource.startsWith("file://");
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

export async function getPackageResourcePath(resource: string) {
    const pending = paths
        .map((location) => [location, join(location, resource), resource])
        .map(([location, path, resource]) => stat(path).then(() => ({location, path, resource})));

    const [state, ...duplicates] = await Promise.allSettled(pending)
        .then((states) => (
            states.filter(isFulfilled)
                .map((state) => state.value)
        ));

    if (duplicates.length > 0) {
        console.warn(`The resource ${resource} path found more than one`);
    }

    assert(state, `The resource ${resource} path hasn't resolved`);

    return state;
}
