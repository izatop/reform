import {BuildContext} from "../build/index.js";
import {assert, assign, withError} from "../internal/index.js";
import logger from "../internal/logger.js";
import {PluginCtor} from "./interfaces.js";
import {PluginAbstract} from "./PluginAbstract.js";

export function isPluginCtor<P extends PluginAbstract>(type: unknown): type is PluginCtor<P> {
    return typeof type === "function" && PluginAbstract.isPrototypeOf(type);
}

export async function load(id: string, context: BuildContext, config: unknown): Promise<PluginAbstract> {
    logger.debug("plugin", "try -> %s", id);

    try {
        const {default: plugin} = await import(id);
        assert(isPluginCtor(plugin), `Wrong default export at ${id}`);

        return new plugin(context, config);
    } catch (error) {
        withError(error, (e) => logger.error(e, "plugin", "load -> %s", e.message));

        throw new Error(`Can't load ${id}`);
    }
}

export function str2re(filter: string | RegExp) {
    try {
        return new RegExp(filter);
    } catch (error) {
        throw new Error(`Wrong filter "${filter}"`);
    }
}

export type WithFilter = {filter: string | RegExp} & Record<any, any>;
export type TransformFilter<T extends WithFilter> = {
    [K in keyof T]: K extends "filter" ? RegExp : T[K];
};

export function assignWithFilter<C extends WithFilter>(
    conf: C,
    ...configs: (Partial<C> | undefined)[]
): TransformFilter<C> {
    const res = assign(conf, ...configs);
    if ("filter" in res) {
        return {...res, filter: str2re(res.filter)};
    }

    return res;
}
