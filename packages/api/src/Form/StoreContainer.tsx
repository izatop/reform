import * as React from "react";
import {StoreContext} from "../Context";
import {Store} from "../Store";

export interface IStoreContext {
    children: (store: Store) => React.ReactNode;
}

export class StoreContainer extends React.PureComponent<IStoreContext> {
    public render() {
        return (
            <StoreContext.Consumer>
                {(store) => this.props.children(store)}
            </StoreContext.Consumer>
        );
    }
}
