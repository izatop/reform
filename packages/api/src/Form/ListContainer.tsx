import * as React from "react";
import {IterableContext} from "../Context";
import {ElementIterable} from "../Store";

export interface IListContainerProps {
    children: (iterator: ElementIterable) => React.ReactNode;
}

export class ListContainer extends React.PureComponent<IListContainerProps> {
    public render() {
        return (
            <IterableContext.Consumer>
                {(iterator) => this.props.children(iterator)}
            </IterableContext.Consumer>
        );
    }
}
