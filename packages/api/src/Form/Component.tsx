import * as React from "react";
import {Receiver} from "../Context";
import {IComponentProps, IComponentState} from "../interfaces";
import {Element} from "../Store";

export abstract class Component<T = any, P = {}> extends Receiver<P & IComponentProps, IComponentState<T>> {
    public state: IComponentState<T>;

    protected link!: Element;

    protected get defaultValue(): T | undefined {
        return ;
    }

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
            return this.defaultValue;
        }

        return value;
    }

    /**
     * Validate value.
     *
     * @param value
     */
    public validate(value?: T): boolean {
        return !(this.props.required && (typeof value === "undefined" || !value));
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
        return nextState.value !== this.state.value;
    }

    public componentDidMount() {
        super.componentDidMount();
        this.link.listen(({value, valid, changed}) => {
            this.setState({value, valid, changed});
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
                defaultValue: this.props.defaultValue || this.defaultValue,
                validate: (value) => this.validate(value),
                compare: (v1, v2) => this.compare(v1, v2),
            },
        );

        return this.link.state;
    }

    protected update(rawValue: any) {
        const value = this.parse(rawValue);
        this.setState(this.link.update(value));
    }
}
