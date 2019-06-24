import * as React from "react";
import {Receiver} from "../Context";
import {IComponentProps, IComponentState} from "../interfaces";
import {Element, IElementState} from "../Store";

export abstract class Component<T = any, P = {}> extends Receiver<P & IComponentProps, IElementState<T>> {
    public state: IElementState<T>;

    protected link!: Element;

    constructor(props: P & IComponentProps, context: any) {
        super(props, context);
        this.state = this.initialize();
    }

    public get value() {
        return this.serialize(this.state.value);
    }

    public get name() {
        return this.props.name;
    }

    public get valid() {
        return this.state.valid;
    }

    public get changed() {
        return this.state.changed;
    }

    protected get defaultValue(): T | undefined {
        return this.props.defaultValue;
    }

    protected get initialValue(): T | undefined {
        return undefined;
    }

    public static getDerivedStateFromProps(nextProps: IComponentProps, prevState: IElementState<any>) {
        if (nextProps.required !== prevState.required) {
            return prevState.deferredUpdate({required: !!nextProps.required});
        }

        return null;
    }

    /**
     * Parse value from controls to store.
     *
     * @param value
     */
    public parse(value?: any): T | undefined {
        return value;
    }

    /**
     * Serialize value from store to controls.
     *
     * @param value
     */
    public serialize(value?: T): any {
        if (typeof value === "undefined" || value === null) {
            return this.initialValue;
        }

        return value;
    }

    /**
     * Validate value.
     *
     * @param value
     * @param required
     */
    public validate(value?: T, required?: boolean): boolean {
        return !required || (typeof value !== "undefined" && !!value);
    }

    /**
     * Compare value with initial value.
     *
     * @param initial
     * @param value
     */
    public compare(initial?: T, value?: T) {
        // compare checks equality by default
        // tslint:disable
        return initial == value;
    }

    public shouldComponentUpdate(nextProps: Readonly<P & IComponentProps>, nextState: Readonly<IComponentState<T>>, nextContext: any): boolean {
        return nextState.version > this.state.version
            || this.props.required !== nextProps.required;
    }

    public componentDidMount() {
        super.componentDidMount();
        const onUpdateValue = typeof this.props.onUpdateValue === "function"
            ? this.props.onUpdateValue!
            : () => void 0;

        this.link.listen((link) => {
            const nextState = link.getState();
            if (nextState.version > this.state.version) {
                this.setState(nextState, () => onUpdateValue(this.state));
            }
        });
    }

    public componentWillUnmount() {
        super.componentWillUnmount();
        this.context.unmount(this.props.name);
    }

    protected initialize() {
        this.link = this.context.mount(
            this.props.name,
            {
                required: this.props.required,
                initialValue: this.initialValue,
                defaultValue: this.defaultValue,
                validate: (value, required: boolean) => this.validate(value, required),
                compare: (v1, v2) => this.compare(v1, v2),
            },
        );

        return this.link.getState();
    }

    protected update(rawValue: any) {
        this.setState(this.link.update(this.parse(rawValue)));
    }
}
