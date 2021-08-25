import {TargetEvent} from "watcher/dist/enums";

export type CacheQueueHandle = (event: TargetEvent) => unknown;
export type CacheQueueDispose = () => void;

export class CacheQueue {
    public readonly id: string;

    readonly #queue = new Map<string, Set<CacheQueueHandle>>();

    constructor(id: string) {
        this.id = id;
    }

    public add(key: string, handle: CacheQueueHandle): CacheQueueDispose {
        const queue = this.ensure(key);
        queue.add(handle);

        return () => queue.delete(handle);
    }

    public off(key: string) {
        this.ensure(key).clear();
    }

    public ensure(key: string) {
        const queue = this.#queue.get(key) ?? new Set();
        if (!this.#queue.has(key)) {
            this.#queue.set(key, queue);
        }

        return queue;
    }

    public fire(key: string, event: TargetEvent) {
        const queue = this.ensure(key);
        for (const fn of queue.values()) {
            fn(event);
        }
    }

    public reset() {
        for (const queue of this.#queue.values()) {
            queue.clear();
        }

        this.#queue.clear();
    }
}
