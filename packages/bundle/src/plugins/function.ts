import {ok} from "assert";
import {Plugin} from "esbuild";
import {assign} from "../internal";
import logger from "../internal/logger";
import {PluginAbstract} from "./PluginAbstract";

export function isPluginCtor<C>(type: unknown): type is { new(config: C): PluginAbstract<C> } {
    return typeof type === "function" && type.isPrototypeOf(PluginAbstract);
}

export function load(id: string, config: unknown): Plugin {
    try {
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        const {default: plugin} = require(id);
        ok(isPluginCtor(plugin), `Wrong default export at ${id}`);

        return new plugin(config).getPluginConfig();
    } catch (error) {
        logger.error("[ %s ]", id, error);

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

export type WithFilter = { filter: string | RegExp } & Record<any, any>;
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
