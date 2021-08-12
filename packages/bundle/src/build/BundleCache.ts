import * as Buffer from "buffer";
import Watcher from "watcher";
import {TargetEvent} from "watcher/dist/enums";
import logger from "../internal/logger";
import {BuildContext} from "./BuildContext";
import {DisposerStatic} from "./index";

export type CacheType = string | Buffer;
export type CacheCallback = () => Promise<CacheType>;
export type CacheHandle = (file: string, event: TargetEvent) => void;

export class BundleCache {
    public readonly base: string;
    readonly #context: BuildContext;
    readonly #store = new Map<string, CacheType>();
    readonly #watchers = new Set<string>();
    readonly #handlers: CacheHandle[] = [];

    constructor(context: BuildContext, base: string) {
        this.base = base;
        this.#context = context;

        logger.info(this, "open");

        const watcherOptions = {ignoreInitial: true, recursive: true};
        const watcher = new Watcher(this.base, watcherOptions, (event, file) => {
            logger.info(this, "%s -> %s", event, this.#context.getRelativePath(file));
            this.#store.delete(file);
            this.#handlers.forEach((fn) => fn(file, event));
        });

        DisposerStatic.add(() => {
            logger.info(this, "close");
            this.#store.clear();
            this.#watchers.clear();
            watcher.close();
        });
    }

    public get id() {
        return this.#context.id;
    }

    public on(handle: CacheHandle) {
        this.#handlers.push(handle);
    }

    public has(file: string) {
        return this.#store.has(file);
    }

    public set(file: string, value: CacheType) {
        logger.debug(this, "store -> %s", this.#context.getRelativePath(file));
        this.#store.set(file, value);
    }

    public async store(file: string, callback: CacheCallback) {
        const value = this.#store.get(file) ?? await callback();
        if (!this.#store.has(file)) {
            this.set(file, value);
        }

        return value;
    }
}
