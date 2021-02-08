export function isString(value: unknown): value is string {
    return typeof value === "string";
}

export function isUndefined(value: unknown): value is undefined {
    return typeof value === "undefined";
}

export function isBoolean(value: unknown): value is boolean {
    return typeof value === "boolean";
}

export function isNumber(value: unknown): value is number {
    return typeof value === "number";
}

export function isNull(value: unknown): value is null {
    return value === null;
}

export function isObject<T extends Record<any, any>>(value: T | unknown): value is T {
    return typeof value === "object" && !isNull(value);
}

export function isArray<T extends any[]>(value: T | unknown): value is T[] {
    return Array.isArray(value);
}
