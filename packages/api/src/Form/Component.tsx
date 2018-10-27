import * as React from "react";
import {Receiver} from "../Context";
import {IComponentProps, IComponentState} from "../interfaces";
import {Element} from "../Store";

export abstract class Component<T = any, P = {}> extends Receiver<P & IComponentProps, IComponentState<T>> {
    public state!: IComponentState<T>;

    protected link!: Element;

    constructor(props: P & IComponentProps, context: any) {
        super(props, context);

        this.initialize();
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
            return "";
        }

        return value.toString();
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

    public componentWillUnmount() {
        super.componentWillUnmount();
        this.store.unmount(this.props.name);
    }

    public hasChanges(value?: T) {
        return value !== this.link.value;
    }

    protected initialize() {
        this.link = this.store.mount(
            this.props.name,
            {
                defaultValue: this.props.defaultValue,
            },
        );

        this.state = {
            value: this.link.value,
            valid: this.validate(this.link.value),
            version: this.store.version,
            changed: false,
        };

        this.link.update(this.link.value, this.state.valid, this.state.changed);
        this.link.listen(({value, valid, changed}) => {
            this.setState({value, valid, changed});
        });
    }

    protected update(rawValue: any) {
        const value = this.parse(rawValue);
        if (this.hasChanges(value)) {
            const valid = this.validate(value);
            const changed = !this.compare(this.link.initial, value);
            this.link.update(value, valid, changed);
        }
    }
}
