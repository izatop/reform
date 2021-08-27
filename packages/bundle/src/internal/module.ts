import logger, {LogTarget} from "./logger";

export function trySafe(label: LogTarget, fn: () => unknown) {
    try {
        fn();
    } catch (error) {
        logger.error(error, label, "trySafe -> %s", error.message);
    }
}

const closeListeners: Array<() => void> = [];
export function onClose(fn: () => void) {
    closeListeners.push(fn);
}

process.on("SIGINT", (event) => {
    process.stdout.write("\r");
    logger.debug("main", "signal -> %s", event);
    closeListeners.forEach((fn) => fn());
});
