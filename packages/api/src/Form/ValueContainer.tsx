import * as React from "react";
import {StoreContext} from "../Context";
import {Element} from "../Store";

export interface IElementContainer {
    name: string;
    children: (element: Element) => React.ReactNode;
}

export class ElementContainer extends React.PureComponent<IElementContainer> {
    public render() {
        return (
            <StoreContext.Consumer>
                {(store) => store.has(this.props.name)
                    ? this.props.children(store.ensure(this.props.name))
                    : null
                }
            </StoreContext.Consumer>
        );
    }
}
