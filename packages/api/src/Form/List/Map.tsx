import * as React from "react";
import {IterableReceiver, StoreContext} from "../../Context";

export interface IMapProps {
    children: React.ReactNode;
}

export class Map<P = {}> extends IterableReceiver<P & IMapProps> {
    public render() {
        return this.context.map((store, id) => (
            <StoreContext.Provider key={id} value={store}>
                {this.props.children}
            </StoreContext.Provider>
        ));
    }
}
