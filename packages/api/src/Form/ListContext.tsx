import * as React from "react";
import {IterableContext} from "../Context";
import {ElementIterable} from "../Store/ElementIterable";

export interface IListContextProps {
    children: (iterator: ElementIterable) => React.ReactNode;
}

export class ListContext extends React.PureComponent<IListContextProps> {
    public render() {
        return (
            <IterableContext.Consumer>
                {(iterator) => this.props.children(iterator)}
            </IterableContext.Consumer>
        );
    }
}
