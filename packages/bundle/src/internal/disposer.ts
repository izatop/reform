import {trySafe} from "../internal";
import logger from "../internal/logger";

export type Disposable = () => unknown;

const disposables: Disposable[] = [];

export class Disposer {
    public static add(disposable: Disposable) {
        disposables.push(disposable);
    }

    public static dispose() {
        logger.debug("Dispose", "listeners -> %d", disposables.length);
        disposables.forEach((fn) => trySafe(this, fn));
    }
}
