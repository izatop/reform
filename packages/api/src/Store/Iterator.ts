import * as React from "react";
import {Element} from "./Element";
import {IFormSource, Store} from "./Store";

export class Iterator<T extends IFormSource = IFormSource> extends Element<T, any[]> {
    public version = 1;
    public id = 0;

    protected children: Array<{id: string, store: Store<T>, state: boolean}> = [];

    constructor(store: Store<T>, iterable?: any[]) {
        super(store, iterable);
        for (const source of this.value || []) {
            this.children.push(this.factory(source));
        }
    }

    protected get activeChildren() {
        return this.children.filter((child) => child.state);
    }

    protected get deletedChildren() {
        return this.children.filter((child) => !child.state);
    }

    public count(state: boolean | undefined = true) {
        if (state) {
            return this.activeChildren.length;
        }

        if (false === state) {
            return this.deletedChildren.length;
        }

        return this.children.length;
    }

    public commit() {
        this.children = this.activeChildren;
        this.children.forEach(({store}) => store.commit());
        return super.commit();
    }

    public reset() {
        for (const child of this.children) {
            child.state = true;
            child.store.reset();
        }

        return super.reset();
    }

    public delete(pointer: Store<T>) {
        if (!this.context.ready) {
            return ;
        }

        this.changed = true;
        for (const child of this.children) {
            if (child.store === pointer) {
                child.state = false;
                child.store.lock();
            }
        }

        this.value = this.children.map(({store}) => store.toObject());
        this.compute();
    }

    public restore(pointer: Store<T>) {
        if (!this.context.ready) {
            return ;
        }

        this.changed = true;
        for (const child of this.children) {
            if (child.store === pointer) {
                child.state = true;
                child.store.unlock();
            }
        }

        this.value = this.children.map(({store}) => store.toObject());
        this.compute();
    }

    public some(fn: (item: any) => boolean) {
        return this.activeChildren.some(({store}) => fn(store.toObject()));
    }

    public add(value: any) {
        this.value!.push(value);
        this.children.push(this.factory(value));
        this.compute();
    }

    public persist(value: any) {
        this.value!.push(value);
        this.children.push(this.factory(value));
        this.commit();
        this.compute();
    }

    public map(fn: (store: Store<T>, id: string) => React.ReactNode, state: boolean | undefined = true) {
        if (state === true) {
            return this.activeChildren.map(({store, id}) => fn(store, id));
        }

        if (state === false) {
            return this.deletedChildren.map(({store, id}) => fn(store, id));
        }

        return this.children.map(({store, id}) => fn(store, id));
    }

    public destroy() {
        this.children.forEach(({store}) => store.destroy());
        this.children.length = 0;
        super.destroy();
    }

    protected compute() {
        for (const {store} of this.activeChildren) {
            this.valid = store.valid;
            this.changed = store.changed;
            if (this.changed || !this.valid) {
                break;
            }
        }

        if (!this.changed) {
            this.changed = this.deletedChildren.length > 0;
        }

        this.listeners.forEach((fn) => fn(this));
    }

    protected factory(source: T) {
        const store = new Store<T>(source);
        store.listen(() => {
            this.compute();
        });

        return {store, state: true, id: `${this.id++}`};
    }
}
