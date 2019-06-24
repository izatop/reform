import {IMountOptions, Store, StoreListener} from "./Store";

export type ElementListener<T, V> = <E extends Element<T, V>>(e: E) => void;

export interface IElementState<V> {
    value: V | undefined;
    valid: boolean;
    changed: boolean;
    version: number;
    required: boolean;
    deferredUpdate: (state: Partial<IElementState<V>>) => IElementState<V>;
}

export class Element<T = any, V = T[keyof T]> {
    public initial?: V;

    protected state: IElementState<V>;

    protected listeners: Array<ElementListener<T, V>> = [];

    constructor(protected context: Store<T>, value: V, protected options: IMountOptions) {
        this.initial = value;
        this.state = {
            deferredUpdate: this.deferredUpdate,
            valid: true,
            changed: false,
            required: options.required || false,
            version: 0,
            value,
        };

        if (typeof value === "undefined") {
            this.state.value = typeof options.defaultValue === "undefined"
                ? options.initialValue
                : options.defaultValue;

            this.initial = options.initialValue;
        }

        this.initialize();
    }

    public get changed() {
        return this.state.changed;
    }

    public get valid() {
        return this.state.valid;
    }

    public get required() {
        return this.state.required;
    }

    public get value() {
        return this.state.value;
    }

    public getState() {
        return this.state;
    }

    public setState(nextState: Partial<IElementState<V>>, updateVersion = false) {
        for (const [key, value] of Object.entries(nextState)) {
            if (Reflect.get(this.state, key) !== value) {
                this.state = {...this.state, ...nextState};
                if (updateVersion) {
                    this.state = {...this.state, version: this.state.version++};
                }
            }
        }

        return this.state;
    }

    public validate() {
        this.setState({
            valid: this.options.validate(this.value, this.required),
            changed: !this.options.compare(this.initial, this.value),
        });

        return this.state;
    }

    public update(value: V | undefined) {
        if (!this.context.ready) {
            return this.state;
        }

        this.setState({
            ...this.state,
            value,
            version: this.state.version + 1,
        });

        this.compute();
        return this.state;
    }

    public commit() {
        if (this.options.compare(this.initial, this.value)) {
            return;
        }

        this.initial = this.value;
        this.setState({
            ...this.state,
            version: this.state.version + 1,
        });

        this.compute();
    }

    public reset() {
        if (this.options.compare(this.initial, this.value)) {
            return;
        }

        this.setState({
            ...this.state,
            value: this.initial,
            version: this.state.version + 1,
        });

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
        this.listeners.length = 0;

        delete this.context;
        delete this.state.value;
    }

    protected deferredUpdate = (nextState: Partial<IElementState<V>>) => {
        this.setState(nextState, true);
        return this.validate();
    }

    protected initialize() {
        this.validate();
    }

    protected compute() {
        this.validate();
        this.fire();
    }
}
