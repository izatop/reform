import {TargetEvent} from "watcher/dist/enums";

export const CACHE_QUEUE_ONCE_QUEUE_HANDLE = Symbol.for("CACHE_QUEUE_ONCE_QUEUE_HANDLE");
export type CacheQueueHandle = (event: TargetEvent) => unknown;
export type CacheQueueOnceHandle = CacheQueueHandle & {[CACHE_QUEUE_ONCE_QUEUE_HANDLE]: true};
export type CacheQueueDispose = () => void;
