import {KeyOf} from "@sirian/ts-extra-types";
import {debounce} from "../utils";
import {Element} from "./Element";
import {ElementIterable} from "./ElementIterable";

export type StoreListener = (props: IStoreFlags) => void;

export interface IFormSource {
    [key: string]: any | any[] | IFormSource;
}

export interface IMountOptions<T extends IFormSource = IFormSource, K extends KeyOf<T> = KeyOf<T>> {
    valid?: boolean;
    changed?: boolean;
    defaultValue?: T[K];
    initialValue?: T[K];
    validate: (value: T[K]) => boolean;
    compare: (value: T[K], compare: T[K]) => boolean;
}

export interface IStoreFlags {
    version: number;
    changed: boolean;
    ready: boolean;
    valid: boolean;
}

export class Store<T extends IFormSource = IFormSource,
    K extends KeyOf<T> = KeyOf<T>> {

    protected listeners: StoreListener[] = [];

    protected readonly children = new Map<K | string, Element<T> | ElementIterable<T>>();

    protected readonly flags: IStoreFlags = {
        version: 1,
        changed: false,
        valid: false,
        ready: true,
    };

    constructor(private source: Partial<T>) {
        this.compute = debounce(this.compute.bind(this), 100);
    }

    get valid() {
        return this.flags.valid;
    }

    get changed() {
        return this.flags.changed;
    }

    public get ready() {
        return this.flags.ready;
    }

    get version() {
        return this.flags.version;
    }

    public lock() {
        this.flags.ready = false;
    }

    public unlock() {
        this.flags.ready = true;
    }

    public begin() {
        this.flags.ready = false;
    }

    public commit() {
        if (0 === this.children.size) {
            return;
        }

        this.children.forEach((child) => child.commit());
        this.source = this.toObject();
        this.flags.version++;
        this.compute();
    }

    public reset() {
        this.lock();
        this.children.forEach((child) => child.reset());
        this.unlock();
        this.compute();

        return ++this.flags.version;
    }

    public toObject<R extends T = T>(): R {
        for (const [ns, child] of this.children.entries()) {
            const {source, key} = this.getPointer(ns);

            source[key] = child.value;
        }

        return this.source as R;
    }

    public getPointer(key: string) {
        if (key.includes(".")) {
            return this.getNested(key);
        }

        return {source: this.source, key};
    }

    public getNested<V>(ns: string): { key: string, source: IFormSource } {
        const keys: string[] = ns.split(".");
        const key = keys.pop()!;

        let source: any = this.source;
        for (const prop of keys) {
            if (typeof source[prop] === "undefined") {
                source[prop] = {};
            }

            source = source[prop];
        }

        return {key, source};
    }

    public resolve(ns: K | string, defaultValue?: T[K] | any) {
        const {source, key} = this.getPointer(ns);

        if (typeof source[key] === "undefined") {
            return defaultValue;
        }

        return source[key];
    }

    public mountArray(key: K | string, options: IMountOptions): ElementIterable<T> {
        if (!this.children.has(key)) {
            const element = new ElementIterable<T>(
                this,
                this.resolve(key, []),
                options,
            );

            this.children.set(
                key,
                element as any,
            );

            element.listen(() => this.compute());
            this.compute();
        }

        return this.children.get(key) as ElementIterable<T>;
    }

    public mount(key: K | string, options: IMountOptions) {
        if (!this.children.has(key)) {
            const element = new Element<T>(
                this,
                this.resolve(key),
                options,
            );

            this.children.set(
                key,
                element as any,
            );

            element.listen(() => this.compute());
            this.compute();
        }

        return this.children.get(key) as Element<T>;
    }

    public unmount(key: K) {
        if (this.children.has(key)) {
            this.children.get(key)!
                .destroy();
            this.children.delete(key);
        }
    }

    public exists(key: K | string) {
        return typeof this.resolve(key) !== "undefined";
    }

    public has(key: K) {
        return this.children.has(key);
    }

    public listen(listener: StoreListener) {
        this.listeners.push(listener);
    }

    public off(listener: StoreListener) {
        this.listeners = this.listeners.filter((fn) => fn !== listener);
    }

    public destroy() {
        this.listeners = [];
        this.children.forEach((child) => child.destroy());
        this.children.clear();
        delete this.source;
    }

    public compute() {
        const children = [...this.children.values()];
        this.flags.valid = children.every((child) => child.valid);
        this.flags.changed = children.some((child) => child.changed);
        this.fire();
    }

    protected fire() {
        this.listeners.forEach((listener) => listener(this.flags));
    }
}
