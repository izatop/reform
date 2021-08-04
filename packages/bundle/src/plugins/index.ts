import {PluginAbstract} from "./PluginAbstract";

export * from "./PluginAbstract";
export * from "./PluginRegistry";

export function isObject(value: unknown): value is Record<any, any> {
    return typeof value === "object" && value !== null;
}

export function isPlugin<A extends PluginAbstract<unknown>>(type: unknown): type is A {
    return isObject(type) && type instanceof PluginAbstract;
}

export function isFunction(type: unknown): type is Function {
    return typeof type === "function";
}
