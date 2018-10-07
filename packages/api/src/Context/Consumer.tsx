import * as React from "react";
import {Store} from "../Store";
import {Context} from "./Context";

export interface IConsumerProps {
    children: (value: {store: Store, version: number}) => React.ReactNode;
}

export class Consumer extends React.Component<IConsumerProps> {
    public render() {
        return (
            <Context.Consumer>
                {this.props.children}
            </Context.Consumer>
        );
    }
}
