import {IMountOptions, Store, StoreListener} from "./Store";

export type ElementListener<T, V> = <E extends Element<T, V>>(e: E) => void;

export class Element<T = any, V = T[keyof T]> {
    public value?: V;

    public initial?: V;

    public valid = true;

    public changed = false;

    protected listeners: Array<ElementListener<T, V>> = [];

    constructor(protected context: Store<T>, value: V, protected options: IMountOptions) {
        this.value = value;
        this.initial = this.value;
        this.valid = this.options.validate(this.value);
        this.changed = this.options.changed || false;
    }

    public get state() {
        return {
            valid: this.valid,
            value: this.value,
            changed: this.changed,
            version: this.context.version,
        };
    }

    public update(value: V | undefined) {
        if (!this.context.ready) {
            return this.state;
        }

        this.value = value;
        this.valid = this.options.validate(this.value);
        this.changed = !this.options.compare(this.initial, this.value);
        this.fire();

        this.context.compute();

        return this.state;
    }

    public commit() {
        this.valid = true;
        this.changed = false;
        this.initial = this.value;
        this.fire();

        return this.value;
    }

    public reset() {
        this.value = this.initial;
        this.valid = this.options.validate(this.value);
        this.changed = false;
        this.fire();

        return this.value;
    }

    public listen(listener: (e: Element<T, V>) => void) {
        this.listeners.push(listener);
    }

    public off(listener: StoreListener) {
        this.listeners = this.listeners.filter((fn) => fn !== listener);
    }

    public fire() {
        this.listeners.forEach((listener) => listener(this));
    }

    public destroy() {
        this.listeners.length = 0;
        delete this.context;
        delete this.value;
    }
}
