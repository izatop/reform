import {Plugin} from "esbuild";
import {BuildContext} from "../build/BuildContext";
import {assert, assign} from "../internal";
import logger from "../internal/logger";
import {PluginAbstract, PluginCtor} from "./PluginAbstract";

export function isPluginCtor<C>(type: unknown): type is PluginCtor<C, any> {
    return typeof type === "function" && PluginAbstract.isPrototypeOf(type);
}

export function load(id: string, context: BuildContext, config: unknown): Plugin {
    logger.debug("Plugin", "try -> %s", id);

    try {
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        const {default: plugin} = require(id);
        assert(isPluginCtor(plugin), `Wrong default export at ${id}`);

        return new plugin(context, config).getPluginConfig();
    } catch (error) {
        logger.error("Plugin", "error -> %o", error);

        throw error;
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
