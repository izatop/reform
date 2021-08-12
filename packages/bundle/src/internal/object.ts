export function entries<T extends Record<any, any>>(target: T) {
    return Object.entries(target);
}

export function isNull(target: unknown): target is null {
    return target === null;
}

export function isObject<T extends Record<any, any>>(target: unknown): target is T {
    return !isNull(target) && typeof target === "object";
}

export function isSameObject<T extends Record<any, any>>(a: T, b: unknown): b is T {
    return isObject(a) && isObject(b);
}

export function mutate<A extends Record<any, any>, B extends Record<any, any>>(target: A, update: B): A & B {
    for (const [key, value] of entries(update)) {
        if (Array.isArray(value)) {
            Reflect.set(target, key, mergeReplaceArray(value));
            continue;
        }

        if (isObject(value)) {
            Reflect.set(target, key, mutate(Reflect.get(target, key) ?? {}, value));
            continue;
        }

        Reflect.set(target, key, value);
    }

    return target;
}

export function mergeReplaceArray<T extends any[]>(target: T): any[] {
    return target.map((item) => {
        if (Array.isArray(item)) {
            return mergeReplaceArray(item);
        }

        if (isObject(item)) {
            return mutate({}, item);
        }

        return item;
    });
}

export function assign<C extends Record<any, any>>(conf: C, ...configs: (Partial<C> | undefined)[]): C {
    return Object.assign({}, conf, ...configs);
}
