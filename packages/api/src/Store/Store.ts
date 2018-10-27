import {KeyOf} from "@sirian/ts-extra-types";
import {IElementType} from "../interfaces";
import {Element} from "./Element";

export type ET<E extends Element<T>, T extends IFormSource = IFormSource> = IElementType<E, T>;
export type StoreListener = (props: IStoreFlags) => void;

export interface IFormSource {
    [key: string]: any | any[] | IFormSource;
}

export interface IMountOptions<T extends IFormSource = IFormSource, K extends KeyOf<T> = KeyOf<T>> {
    defaultValue?: T[K];
    valid?: boolean;
    changed?: boolean;
}

export interface IStoreFlags {
    version: number;
    changed: boolean;
    ready: boolean;
    valid: boolean;
}

export class Store<T extends IFormSource = IFormSource,
    K extends KeyOf<T> = KeyOf<T>,
    E extends Element = Element> {

    protected listeners: StoreListener[] = [];

    protected readonly children = new Map<K | string, E>();

    protected readonly flags: IStoreFlags = {
        version: 1,
        changed: false,
        ready: true,
        valid: true,
    };

    constructor(private source: Partial<T>) {
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
        this.fire();
    }

    public commit() {
        if (0 === this.children.size) {
            return;
        }

        this.children.forEach((child) => child.commit());

        this.flags.ready = true;
        this.flags.valid = true;
        this.flags.changed = false;
        this.source = this.toObject();

        this.fire();

        return ++this.flags.version;
    }

    public reset() {
        this.children.forEach((child) => child.reset());

        this.flags.valid = true;
        this.flags.changed = false;
        this.source = this.toObject();

        this.fire();

        return this.flags.version;
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

    public mount(key: K | string, options?: IMountOptions): E;
    public mount<V extends Element<T>, S extends ET<V, T>>(key: K | string, type: S, options?: IMountOptions): V;
    public mount(key: K | string, ...args: any[]) {
        const options: IMountOptions = {};
        let Type = Element;
        if (args.length === 1) {
            if (args[0].constructor.name === "Object") {
                Object.assign(options, args[0]);
            }

            if (Element.isPrototypeOf(args[0])) {
                Type = args[0];
            }
        }

        if (args.length === 2) {
            Type = args[0];
            Object.assign(options, args[1]);
        }

        if (!this.children.has(key)) {
            const element = new Type<T>(
                this,
                this.resolve(key, options.defaultValue),
                options,
            );

            this.children.set(
                key,
                element as any,
            );

            this.compute();
        }

        return this.children.get(key)!;
    }

    public compute() {
        for (const child of this.children.values()) {
            this.flags.valid = child.valid;
            if (!this.flags.valid) {
                break;
            }
        }

        for (const child of this.children.values()) {
            this.flags.changed = child.changed;
            if (this.flags.changed) {
                break;
            }
        }

        this.fire();
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

    protected fire() {
        this.listeners.forEach((listener) => listener(this.flags));
    }
}
