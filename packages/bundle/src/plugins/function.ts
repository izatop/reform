import {BuildContext} from "../build";
import {assert, assign, withError} from "../internal";
import logger from "../internal/logger";
import {PluginCtor} from "./interfaces";
import {PluginAbstract} from "./PluginAbstract";

const isPrototypeOf = (target: unknown, value: unknown) => {
    if (typeof target !== "object" || target === null) {
        return false;
    }

    if (typeof value === "object" && value) {
        return Object.prototype.isPrototypeOf.call(target, value);
    }

    return false;
};

export function isPluginCtor<P extends PluginAbstract>(type: unknown): type is PluginCtor<P> {
    return typeof type === "function" && isPrototypeOf(PluginAbstract, type);
}

export function load(id: string, context: BuildContext, config: unknown): PluginAbstract {
    logger.debug("plugin", "try -> %s", id);

    try {
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        const {default: plugin} = require(id);
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
    [K in keyof T]: K extends "filter" ? RegExp : T[K]
};

export function assignWithFilter<C extends WithFilter>(conf: C,
    ...configs: (Partial<C> | undefined)[]): TransformFilter<C> {
    const res = assign(conf, ...configs);
    if ("filter" in res) {
        return {...res, filter: str2re(res.filter)};
    }

    return res;
}
