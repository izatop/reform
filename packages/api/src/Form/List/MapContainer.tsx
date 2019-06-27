import * as React from "react";
import {IterableReceiver} from "../../Context";
import {ElementIterableHelper, Store} from "../../Store";

export type MapContainerChildren = (store: Store<any>, helper: ElementIterableHelper) => React.ReactNode;

export interface IMapContainerProps {
    children: MapContainerChildren;
}

export class MapContainer<P = {}> extends IterableReceiver<P & IMapContainerProps> {
    public render() {
        return this.context.map((store, id) => (
            <React.Fragment key={id}>
                {this.props.children(store, new ElementIterableHelper(this.context, store))}
            </React.Fragment>
        ));
    }
}
