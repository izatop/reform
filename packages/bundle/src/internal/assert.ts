export class AssertionError extends Error {
    public readonly details?: unknown;

    constructor(message: string, details?: unknown) {
        super(message);
        this.details = details;
    }
}

export function assert(expr: unknown, message = "Assertion error", details?: unknown): asserts expr {
    if (!expr) {
        throw new AssertionError(message, details);
    }
}
