export function isError(error: unknown): error is Error {
    return error instanceof Error;
}

export function withError<T>(error: unknown, fn: (error: Error) => T): T | undefined;
export function withError<T>(error: unknown, fn: (error: Error) => T, or: () => T): T;
export function withError<T>(error: unknown, fn: (error: Error) => T, or?: () => T): T | undefined {
    if (isError(error)) {
        return fn(error);
    }

    return or?.();
}
