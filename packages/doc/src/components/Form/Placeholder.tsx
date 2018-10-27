import {Receiver, Store} from "@reform/api";
import * as React from "react";

export interface IPlaceholderProps<T> {
    name: string;
    render?: (value: T, store: Store) => React.ReactNode;
}

export class Placeholder<T = any> extends Receiver<IPlaceholderProps<T>> {
    public state = {t: Date.now()};

    public render() {
        const value = this.store.resolve(this.props.name);
        return this.props.render ? this.props.render(value, this.store) : value;
    }

    protected onStoreUpdate() {
        this.setState({t: Date.now()});
    }
}
