import {ElementIterable} from "./ElementIterable";
import {Store} from "./Store";

export class ElementIterableHelper {
    constructor(protected iterator: ElementIterable, protected store: Store) {
    }

    public delete = () => {
        this.iterator.delete(this.store);
    }

    public restore = () => {
        this.iterator.restore(this.store);
    }
}
