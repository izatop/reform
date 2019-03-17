import {IMountOptions, Store, StoreListener} from "./Store";

export type ElementListener<T, V> = <E extends Element<T, V>>(e: E) => void;

export class Element<T = any, V = T[keyof T]> {
    public value?: V;

    public initial?: V;

    public valid = true;

    public changed = false;

    public version = 0;

    protected listeners: Array<ElementListener<T, V>> = [];

    constructor(protected context: Store<T>, value: V, protected options: IMountOptions) {
        this.value = value;
        this.initial = value;

        if (typeof value === "undefined") {
            this.value = typeof options.defaultValue === "undefined"
                ? this.options.initialValue
                : this.options.defaultValue;

            this.initial = this.options.initialValue;
        }

        this.valid = this.options.validate(this.value);
        this.changed = !this.options.compare(this.initial, this.value);
    }

    public get state() {
        return {
            valid: this.valid,
            value: this.value,
            changed: this.changed,
            version: this.version,
        };
    }

    public update(value: V | undefined) {
        if (!this.context.ready) {
            return this.state;
        }

        this.value = value;
        this.version++;
        this.compute();

        return this.state;
    }

    public commit() {
        if (this.options.compare(this.initial, this.value)) {
            return;
        }

        this.initial = this.value;
        this.version++;
        this.compute();
    }

    public reset() {
        if (this.options.compare(this.initial, this.value)) {
            return;
        }

        this.value = this.initial;
        this.version++;
        this.compute();
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
        this.listeners.splice(0, this.listeners.length);
        delete this.context;
        delete this.value;
    }

    protected compute() {
        this.valid = this.options.validate(this.value);
        this.changed = !this.options.compare(this.initial, this.value);
        this.fire();
    }
}
