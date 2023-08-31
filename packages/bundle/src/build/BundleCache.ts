import {stat} from "fs/promises";

import {assign, Disposer} from "../internal/index.js";
import logger from "../internal/logger.js";
import {BuildContext} from "./BuildContext.js";
import {CacheQueue} from "./Cache/CacheQueue.js";
import {CACHE_QUEUE_ONCE_QUEUE_HANDLE, CacheQueueHandle} from "./Cache/interfaces.js";
import {Directory, File} from "./Resources/index.js";

export type CacheCallback<T> = (deps: string[]) => Promise<T>;
export type CacheContainer<T = unknown> = {result: T; modified: Date; deps: string[]};
const cache = new Map<string, CacheContainer>();

export class BundleCache {
    public readonly base: Directory;

    readonly #context: BuildContext;

    readonly #queue: CacheQueue;

    readonly #store = cache;

    constructor(context: BuildContext, base: Directory) {
        this.base = base;
        this.#context = context;
        this.#queue = new CacheQueue(this.#context.id);

        logger.debug(this, "open");

        if (this.#context.watch) {
            const enforceWatch = async () => {
                const Watcher = (await import("watcher")).default;
                const watcherOptions = {ignoreInitial: true, recursive: true};
                const watcher = new Watcher(this.base.path, watcherOptions, (event: any, file: any) => {
                    this.#queue.fire(file, event);
                });

                Disposer.add(() => watcher.close());
            };

            setImmediate(enforceWatch);
        }

        Disposer.add(() => {
            logger.debug(this, "close");

            this.reset();
        });
    }

    public get id() {
        return this.#context.id;
    }

    public on(file: string, handle: CacheQueueHandle) {
        logger.debug(this, "on -> %s", file);
        this.#queue.add(file, handle);
    }

    public once(file: string, handle: CacheQueueHandle) {
        this.#queue.add(file, assign(handle, {[CACHE_QUEUE_ONCE_QUEUE_HANDLE]: true}));
    }

    public off(file: string) {
        logger.debug(this, "off -> %s", file);
        this.#queue.off(file);
    }

    public has(file: File<any>) {
        return this.#store.has(file.path);
    }

    public async store<T>(file: string, callback: CacheCallback<T>): Promise<T> {
        const key = this.base.getRelativePath(file);
        const container = this.#store.get(file);
        const {ctime} = await stat(file);

        if (container) {
            logger.debug(this, "check -> %s", key);
            const deps = await Promise.all(container.deps.map((file) => stat(file)));
            const maxTime = Math.max(
                ...[ctime, ...deps.map((s) => s.ctime)]
                    .map((date) => date.getTime()),
            );

            if (maxTime <= container.modified.getTime()) {
                logger.debug(this, "hit -> %s", key);

                return container.result as T;
            }
        }

        const deps: string[] = [];
        const result = await callback(deps);

        logger.debug(this, "store -> %s", key);
        this.#store.set(file, {result, deps, modified: ctime});

        return result as T;
    }

    public drop(file: string) {
        this.#store.delete(file);
    }

    public reset() {
        this.#store.clear();
        this.#queue.reset();
    }
}
