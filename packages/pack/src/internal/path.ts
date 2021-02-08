import * as assert from "assert";
import * as path from "path";

export function resolveAt(base: string, resource: string): string {
    return path.join(base, resource);
}

export function resolveStrictAt(base: string, resource: unknown, message: string) {
    assert(typeof resource === "string", message);
    return resolveAt(base, resource);
}

export function relativeTo(file: string, directory: string): string {
    const filePath = path.dirname(file);
    return path.resolve(
        filePath,
        path.relative(
            filePath,
            directory,
        ),
        path.basename(file),
    );
}
