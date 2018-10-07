import * as React from "react";
import {Context} from "../Context";
import {Store} from "../Store";

export interface IResolveProps<T = any> {
    name: string;
    defaultValue?: T;
    render?: (value: T, store: Store) => React.ReactNode;
}

export const Resolve: React.StatelessComponent<IResolveProps> = (props) => {
    const render = props.render ? props.render : (value: any, store: Store) => value;
    return (
        <Context.Consumer>
            {({store}) => render(store.resolve(props.name, props.defaultValue), store)}
        </Context.Consumer>
    );
};
