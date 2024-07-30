import {
    BuildResult,
    OnLoadArgs,
    OnLoadOptions,
    OnLoadResult,
    OnResolveArgs,
    OnResolveOptions,
    OnResolveResult,
    OnStartResult,
    PartialMessage,
} from "esbuild";

import {BuildContext} from "../build/index.js";
import {Promisify} from "../internal/index.js";
import {PluginAbstract} from "./PluginAbstract.js";

export type PluginConfig = Record<any, any> | null;

export type PluginCtor<P extends PluginAbstract<any>> = {
    new (context: BuildContext, config: any): P;
    prototype: PluginAbstract;
};

export type PluginEventStartRet = Promisify<OnStartResult | null | void>;
export type PluginEventResolveRet = OnResolveResult | null | undefined | Promise<OnResolveResult | null | undefined>;
export type PluginEventLoadRet = Promisify<OnLoadResult | null | undefined>;
export type PluginEventErrorRet = {errors?: PartialMessage[]};
export type PluginEventHandle<T, A extends any[]> = (...args: A) => Promisify<T>;

export interface IPluginEvent {
    start: [fn: () => PluginEventStartRet];
    end: [(result: BuildResult) => Promisify<void>];
    resolve: [options: OnResolveOptions, fn: (args: OnResolveArgs) => PluginEventResolveRet];
    load: [options: OnLoadOptions, fn: (args: OnLoadArgs) => PluginEventLoadRet];
}

export type PluginEventKey = keyof IPluginEvent;
export type PluginListener<K extends PluginEventKey> = IPluginEvent[K];
