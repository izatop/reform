import * as React from "react";
import {StoreContext, IterableContext} from "../../Context";
import {ListContextType} from "../List";
import {MapContext} from "./MapContext";

export interface IMapProps {
    children: React.ReactNode;
}

export class Map<P = {}> extends React.Component<IMapProps & P> {
    public static Context = MapContext;

    public render() {
        return (
            <IterableContext.Consumer>
                {this.iterate}
            </IterableContext.Consumer>
        );
    }

    private iterate: ListContextType = (iterator) => (
        iterator.map(
            (store, id) => (
                <StoreContext.Provider key={id} value={store}>
                    {this.props.children}
                </StoreContext.Provider>
            ),
        )
    )
}
