export class AssertionError extends Error {
    constructor(message: string, details?: unknown) {
        super(message.concat("\n\n", JSON.stringify(details, null, 2)));
    }
}

export function assert(expr: unknown, message = "Assertion error", details?: unknown): asserts expr {
    if (!expr) {
        throw new AssertionError(message, details);
    }
}
