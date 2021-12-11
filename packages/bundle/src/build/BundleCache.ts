import Watcher from "watcher";
import {WatcherOptions} from "watcher/dist/types";
import logger from "../internal/logger";
import {Disposer, assign} from "../internal";
import {Directory, File} from "./Resources";
import {BuildContext} from "./BuildContext";
import {CacheQueue} from "./Cache/CacheQueue";
import {CacheQueueHandle, CACHE_QUEUE_ONCE_QUEUE_HANDLE} from "./Cache/interfaces";

export type CacheCallback<T> = (key: string) => Promise<T>;
const cache = new Map<string, unknown>();

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
            const watcherOptions: WatcherOptions = {ignoreInitial: true, recursive: true};
            const watcher = new Watcher(this.base.path, watcherOptions, (event, key) => {
                const file = base.getRelativePath(key);
                this.#queue.fire(file, event);
            });

            Disposer.add(() => watcher.close());
        }

        Disposer.add(() => {
            logger.debug(this, "close");
            this.reset();
        });
    }

    public get id() {
        return this.#context.id;
    }

    public on(key: string, handle: CacheQueueHandle) {
        logger.debug(this, "on -> %s", key);
        this.#queue.add(key, handle);
    }

    public once(key: string, handle: CacheQueueHandle) {
        this.#queue.add(key, assign(handle, {[CACHE_QUEUE_ONCE_QUEUE_HANDLE]: true}));
    }

    public off(key: string) {
        logger.debug(this, "off -> %s", key);
        this.#queue.off(key);
    }

    public has(file: File<any>) {
        return this.#store.has(file.path);
    }

    public async store<T>(key: string, callback: CacheCallback<T>): Promise<T> {
        const value = this.#store.get(key) ?? await callback(key);
        if (!this.#store.has(key)) {
            logger.debug(this, "store -> %s", key);
            this.#store.set(key, value);
        }

        return value as T;
    }

    public drop(key: string) {
        this.#store.delete(key);
    }

    public reset() {
        this.#store.clear();
        this.#queue.reset();
    }
}
