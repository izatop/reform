import {existsSync} from "fs";
import * as path from "path";
import {assert} from "./assert";

export function resolveThrough(directory: string, resource: string): string | undefined {
    const paths = directory
        .split(path.sep)
        .map((s, i, a) => path.resolve(path.sep, a.slice(0, i + 1).join("/")));

    for (const next of paths) {
        const filename = path.join(next, resource);
        if (existsSync(filename)) {
            return filename;
        }
    }
}

export function resolveStrictAt(base: string, resource: unknown, message: string) {
    assert(typeof resource === "string", message, {resource});

    return path.join(base, resource);
}