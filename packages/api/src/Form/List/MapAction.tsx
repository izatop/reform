import * as React from "react";
import {IterableReceiver, StoreContext} from "../../Context";
import {ElementIterableHelper} from "../../Store";
import {MapContainerChildren} from "./MapContainer";

export interface IMapActionProps {
    children: MapContainerChildren;
}

export class MapAction<P = {}> extends IterableReceiver<P & IMapActionProps> {
    public render() {
        return (
            <StoreContext.Consumer>
                {(store) => this.props.children(store, new ElementIterableHelper(this.context, store))}
            </StoreContext.Consumer>
        );
    }
}
