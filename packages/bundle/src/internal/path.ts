import {ok} from "assert";
import * as path from "path";

export function resolveAt(base: string, resource: string): string {
    return path.join(base, resource);
}

export function resolveStrictAt(base: string, resource: unknown, message: string) {
    ok(typeof resource === "string", message);
    return resolveAt(base, resource);
}

export function relativeTo(from: string, to: string): string {
    return path.relative(from, to);
}
