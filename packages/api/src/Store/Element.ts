import {IFormSource, IMountOptions, Store} from "./Store";

export type ElementListener<T, V> = <E extends Element<T, V>>(e: E) => void;

export class Element<T extends IFormSource = IFormSource, V = any> {
    public value?: V;

    public initial?: V;

    public valid = true;

    public changed = false;

    protected listeners: Array<ElementListener<T, V>> = [];

    constructor(protected context: Store<T>, value?: any, protected options: IMountOptions = {}) {
        this.value = value;
        if (!this.isDefined()) {
            this.value = options.defaultValue;
        }

        this.initial = this.value;
    }

    public commit() {
        this.valid = true;
        this.changed = false;
        this.initial = this.value;
        this.listeners.forEach((listener) => listener(this));
        return this.value;
    }

    public reset() {
        this.valid = true;
        this.changed = false;
        this.value = this.initial;
        this.listeners.forEach((listener) => listener(this));
        return this.value;
    }

    public update(value: V | undefined, valid: boolean, changed: boolean) {
        if (!this.context.ready) {
            return;
        }

        this.value = value;
        this.valid = valid;
        this.changed = changed;
        this.listeners.forEach((listener) => listener(this));
        this.context.compute();
    }

    public listen(listener: (e: Element<T, V>) => void) {
        this.listeners.push(listener);
    }

    public destroy() {
        this.listeners.length = 0;
        delete this.context;
        delete this.value;
    }

    public isDefined() {
        return typeof this.value !== "undefined";
    }
}
