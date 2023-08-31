import {CacheQueueDispose, CacheQueueHandle, CacheQueueOnceHandle} from "./interfaces.js";

export class CacheQueue {
    public readonly id: string;

    readonly #queue = new Map<string, Set<CacheQueueHandle | CacheQueueOnceHandle>>();

    constructor(id: string) {
        this.id = id;
    }

    public add(key: string, handle: CacheQueueHandle | CacheQueueOnceHandle): CacheQueueDispose {
        const queue = this.ensure(key);
        queue.add(handle);

        return () => queue.delete(handle);
    }

    public off(key: string): void {
        this.ensure(key).clear();
    }

    public ensure(key: string): Set<CacheQueueHandle | CacheQueueOnceHandle> {
        const queue = this.#queue.get(key) ?? new Set();
        if (!this.#queue.has(key)) {
            this.#queue.set(key, queue);
        }

        return queue;
    }

    public fire(key: string, event: any): void {
        const queue = this.ensure(key);
        for (const fn of queue.values()) {
            fn(event);
        }
    }

    public reset(): void {
        for (const queue of this.#queue.values()) {
            queue.clear();
        }

        this.#queue.clear();
    }
}
