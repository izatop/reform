import * as React from "react";
import {IterableContext} from "../Context";
import {Iterator} from "../Store/Iterator";

export interface IListContextProps {
    children: (iterator: Iterator, version: number) => React.ReactNode;
}

export class ListContext extends React.Component<IListContextProps> {
    public render() {
        return (
            <IterableContext.Consumer>
                {({iterator, version}) => this.props.children(iterator, version)}
            </IterableContext.Consumer>
        );
    }
}
