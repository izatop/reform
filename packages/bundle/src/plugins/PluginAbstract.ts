import {Plugin, PluginBuild} from "esbuild";
import {FSWatcher, unwatchFile, watch} from "fs";

export abstract class PluginAbstract<TConfig extends (Record<any, any> | undefined) = undefined> {
    protected readonly config: TConfig;
    readonly #cache = new Map<string, string>();
    readonly #watch = new Map<string, FSWatcher>();

    constructor(config: TConfig) {
        this.config = config;
    }

    public get name() {
        return this.constructor.name;
    }

    public getPluginConfig(): Plugin {
        return {
            name: this.name,
            setup: (build: PluginBuild): void => this.connect(build),
        };
    }

    protected abstract connect(build: PluginBuild): void;

    protected async store(file: string, fn: () => Promise<string>) {
        const cache = this.#cache.get(file) ?? await fn();

        if (!this.#cache.has(file)) {
            this.#cache.set(file, cache);
        }

        if (!this.#watch.has(file)) {
            const watcher = watch(file, (state) => {
                if (state === "rename") {
                    this.#watch.delete(file);
                    watcher.close();
                }

                this.#cache.delete(file);
            });

            this.#watch.set(file, watcher);
        }

        return cache;
    }
}
