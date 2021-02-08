import * as assert from "assert";
import {PluginAbstract} from "./PluginAbstract";

export type PluginCtor<A extends PluginAbstract<any>> = {
    new(config: any): A;
    getPluginName(): string;
};

export class PluginRegistry {
    private static registry = new Map<string, PluginCtor<any>>();

    public static add<T extends PluginCtor<any>>(plugin: T) {
        assert(
            !this.registry.has(plugin.getPluginName()),
            `Plugin ${plugin.getPluginName()} already registered`,
        );

        this.registry.set(plugin.getPluginName(), plugin);
    }
}
