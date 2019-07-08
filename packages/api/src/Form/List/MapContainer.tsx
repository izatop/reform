import * as React from "react";
import {IterableReceiver, StoreContext} from "../../Context";
import {ElementIterableHelper, Store} from "../../Store";

export type MapContainerChildren = (store: Store<any>, helper: ElementIterableHelper) => React.ReactNode;

export interface IMapContainerProps {
    children: MapContainerChildren;
}

export class MapContainer<P = {}> extends IterableReceiver<P & IMapContainerProps> {
    public render() {
        return this.context.map((store, id) => (
            <StoreContext.Provider key={id} value={store}>
                {this.props.children(store, new ElementIterableHelper(this.context, store))}
            </StoreContext.Provider>
        ));
    }
}
