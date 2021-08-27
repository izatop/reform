import {withError} from "./error";
import logger, {LogTarget} from "./logger";

export function trySafe(label: LogTarget, fn: () => unknown) {
    try {
        fn();
    } catch (error) {
        withError(error, (e) => logger.error(e, label, "trySafe -> %s", e.message));
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
