import {Iterator} from "./Iterator";
import {Store} from "./Store";

export class IteratorHelper {
    constructor(protected iterator: Iterator, protected store: Store) {
    }

    public delete = () => {
        this.iterator.delete(this.store);
    }

    public restore = () => {
        this.iterator.restore(this.store);
    }
}
