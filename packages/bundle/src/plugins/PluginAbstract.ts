import {PluginBuild} from "esbuild";

import {BuildContext, BundleCache} from "../build/index.js";
import {has, Promisify, withError} from "../internal/index.js";
import {
    IPluginEvent,
    PluginConfig,
    PluginEventErrorRet,
    PluginEventHandle,
    PluginEventKey,
    PluginListener,
} from "./interfaces.js";

export abstract class PluginAbstract<C extends PluginConfig = null> {
    public abstract readonly name: string;

    protected readonly context: BuildContext;

    protected readonly config: C;

    readonly #events: Array<Partial<IPluginEvent>> = [];

    constructor(context: BuildContext, config: C) {
        this.context = context;
        this.config = config;
    }

    protected get cache(): BundleCache {
        return this.context.cache;
    }

    public async setup(build: PluginBuild) {
        const keys: PluginEventKey[] = ["start", "resolve", "load", "end"];

        for (const map of this.#events) {
            for (const event of keys) {
                if (!has(map, event)) {
                    continue;
                }

                switch (event) {
                    case "start":
                        build.onStart(this.wrap(map[event][0]));
                        break;

                    case "resolve":
                        build.onResolve(map[event][0], this.wrap(map[event][1]));
                        break;

                    case "load":
                        build.onLoad(map[event][0], this.wrap(map[event][1]));
                        break;

                    case "end":
                        build.onEnd(map[event][0]);
                        break;
                }
            }
        }
    }

    public abstract configure(): Promisify<void>;

    protected on<K extends PluginEventKey>(event: K, ...args: PluginListener<K>) {
        this.#events.push({[event]: args});

        return this;
    }

    protected getRelativePath(path: string): string {
        const {base} = this.context;

        return base.getRelativePath(path);
    }

    private wrap<T, A extends any[], F extends PluginEventHandle<T, A>>(
        fn: F,
    ): (...args: A) => Promise<T | PluginEventErrorRet> {
        return (...args: A): Promise<T | PluginEventErrorRet> => {
            try {
                return this.try(fn(...args));
            } catch (error) {
                return this.report(error);
            }
        };
    }

    private async try<T>(result: Promisify<T>): Promise<T | PluginEventErrorRet> {
        return Promise.resolve(result).catch(this.report);
    }

    private report = (error: unknown): Promise<PluginEventErrorRet> => {
        const errors = withError(
            error,
            (e) => [
                {
                    text: e.message,
                    pluginName: this.name,
                },
            ],
            () => [
                {
                    text: "Unknown error",
                    pluginName: this.name,
                },
            ],
        );

        return Promise.resolve({errors});
    };
}
