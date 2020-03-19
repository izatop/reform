import * as React from "react";
import {Element} from "./Element";
import {IMountOptions, Store} from "./Store";

export interface IIterableContainer<T> {
    id: string;
    store: Store<T>;
    changed: boolean;
    valid: boolean;
    added: boolean;
}

let ELEMENT_ID = 0;

export class ElementIterable<T = any> extends Element<T, any[]> {
    protected children!: IIterableContainer<T>[];

    constructor(store: Store<T>, iterable: any[], options: IMountOptions) {
        super(store, iterable, options);
    }

    public validate() {
        this.state = {
            ...this.state,
            valid: this.children.every((container) => container.valid),
            changed: this.children.some((container) => (
                container.added || !container.store.ready || container.changed
            )),
        };

        return this.state;
    }

    public count() {
        return this.children.filter(({store}) => store.ready).length;
    }

    public commit() {
        if (!this.state.changed) {
            return;
        }

        const deleted = this.children.filter(({store}) => !store.ready);
        deleted.forEach(({store}) => store.destroy());

        this.children.filter((container) => container.added)
            .forEach((container) => container.added = false);

        this.children = this.children.filter(({store}) => store.ready);
        this.children.forEach(({store}) => store.commit());
        this.state.version++;

        this.compute();

        this.initial = this.value;
    }

    public reset() {
        if (!this.state.changed) {
            return;
        }

        this.children.filter((child) => child.added)
            .forEach(({store}) => store.destroy());

        this.children.filter((child) => child.changed)
            .forEach(({store}) => store.reset());

        this.children.filter(({store}) => !store.ready)
            .forEach(({store}) => store.unlock());

        this.children = this.children.filter((child) => !child.added);
        this.compute();
    }

    public restore(target: Store<T>) {
        for (const child of this.children) {
            if (child.store === target) {
                child.store.unlock();
            }
        }

        this.compute();
    }

    public delete(target: Store<T>) {
        if (!this.context.ready) {
            return;
        }

        const container = this.children.find(({store}) => store === target);
        if (!container) {
            return;
        }

        if (container.added) {
            this.children = this.children.filter((child) => child !== container);
            container.store.destroy();
        } else {
            container.store.lock();
        }

        this.compute();
    }

    public some(fn: (item: any) => boolean) {
        return this.children
            .filter(({store}) => store.ready)
            .some(({store}) => fn(store.toObject()));
    }

    public add(value: any) {
        this.value!.push(value);
        this.children.push(this.factory(value, true));
        return this.compute();
    }

    public persist(value: any) {
        this.value!.push(value);
        this.children.push(this.factory(value));
        this.commit();
    }

    public mapAll(fn: (store: Store<T>, id: string) => React.ReactNode) {
        return this.children
            .map(({store, id}) => fn(store, id));
    }

    public map(fn: (store: Store<T>, id: string) => React.ReactNode) {
        return this.children
            .filter(({store}) => store.ready)
            .map(({store, id}) => fn(store, id));
    }

    public destroy() {
        this.children.forEach(({store}) => store.destroy());
        this.children = [];
        super.destroy();
    }

    protected initialize() {
        this.children = [];
        for (const source of this.value || []) {
            this.children.push(this.factory(source));
        }

        this.validate();
    }

    protected compute() {
        this.state.version++;
        this.state.value = this.children
            .filter(({store}) => store.ready)
            .map(({store}) => store.toObject());

        this.validate();
        this.fire();
    }

    protected factory(source: any, added = false) {
        const store = new Store<T>(source);
        const container = {
            added,
            store,
            id: `${ELEMENT_ID++}`,
            valid: store.valid,
            changed: store.changed,
        };

        store.listen(({valid, changed}) => {
            container.valid = valid;
            container.changed = changed;

            this.compute();
        });

        return container;
    }
}
