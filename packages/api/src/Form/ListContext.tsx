import * as React from "react";
import {IterableContext} from "../Context";
import {ElementIterable} from "../Store/ElementIterable";

export interface IListContextProps {
    children: (iterator: ElementIterable, version: number) => React.ReactNode;
}

export class ListContext extends React.PureComponent<IListContextProps> {
    public render() {
        return (
            <IterableContext.Consumer>
                {({iterator, version}) => this.props.children(iterator, version)}
            </IterableContext.Consumer>
        );
    }
}
