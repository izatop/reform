import * as React from "react";
import {Element} from "./Element";
import {IFormSource, Store} from "./Store";

export class ElementIterable<T extends IFormSource = IFormSource> extends Element<T, any[]> {
    public version = 1;
    public id = 0;

    protected children: Array<{id: string, store: Store<T>}> = [];

    constructor(store: Store<T>, iterable?: any[]) {
        super(store, iterable);
        for (const source of this.value || []) {
            this.children.push(this.factory(source));
        }

        this.compute();
    }

    public count() {
        return this.children.filter(({store}) => store.ready).length;
    }

    public commit() {
        const deleted = this.children.filter(({store}) => false === store.ready);
        deleted.forEach(({store}) => store.destroy());

        this.children = this.children.filter(({store}) => store.ready);
        this.children.forEach(({store}) => store.commit());
        this.version++;
        return super.commit();
    }

    public reset() {
        this.children.forEach(({store}) => store.reset());

        const children = this.children
            .filter(({store}) => false === store.ready);

        for (const {store} of children) {
            store.unlock();
        }

        this.compute();
        this.version++;
        return this.value;
    }

    public restore(pointer: Store<T>) {
        for (const child of this.children) {
            if (child.store === pointer) {
                child.store.unlock();
            }
        }

        this.version++;
        return this.compute();
    }

    public delete(pointer: Store<T>) {
        if (!this.context.ready) {
            return ;
        }

        for (const child of this.children) {
            if (child.store === pointer) {
                child.store.lock();
            }
        }

        this.version++;
        return this.compute();
    }

    public some(fn: (item: any) => boolean) {
        return this.children
            .filter(({store}) => store.ready)
            .some(({store}) => fn(store.toObject()));
    }

    public add(value: any) {
        this.value!.push(value);
        this.children.push(this.factory(value));
        return this.compute();
    }

    public persist(value: any) {
        this.value!.push(value);
        this.children.push(this.factory(value));
        this.version++;
        this.commit();
        return this.compute();
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

    protected compute() {
        for (const {store} of this.children) {
            this.valid = store.valid;
            this.changed = store.changed;
            if (this.changed || !this.valid) {
                break;
            }
        }

        if (!this.changed) {
            this.changed = this.children.some(({store}) => false === store.ready);
        }

        this.value = this.children
            .filter(({store}) => store.ready)
            .map(({store}) => store.toObject());

        this.listeners.forEach((fn) => fn(this));

        return this.value;
    }

    protected factory(source: T) {
        const store = new Store<T>(source);
        store.listen(() => {
            this.compute();
        });

        return {store, state: true, id: `${this.id++}`};
    }
}
