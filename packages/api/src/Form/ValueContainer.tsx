import * as React from "react";
import {Receiver} from "../Context";

export interface IElementContainer<T = any> {
    name: string;
    children: (value: T | undefined) => React.ReactNode;
}

export class ValueContainer<T = any> extends Receiver<IElementContainer<T>> {
    public state: { value?: T } = {};

    public render() {
        return this.props.children(this.state.value);
    }

    protected disposable = () => {
        if (this.context.has(this.props.name)) {
            const {value} = this.context.ensure(this.props.name);
            this.setState({value});
        }
    }
}
