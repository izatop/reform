import * as React from "react";
import {Context, IterableContext} from "../../Context";
import {IteratorHelper, Store} from "../../Store";
import {Map} from "./Map";

export interface IMapContextProps {
    children: (store: Store, helper: IteratorHelper) => React.ReactNode;
}

export class MapContext extends Map<IMapContextProps> {
    public render() {
        return (
            <IterableContext.Consumer>
                {({iterator, version}) => (
                    iterator.map(
                        (store, id) => (
                            <Context.Provider key={id} value={{store, version}}>
                                {this.props.children(store, new IteratorHelper(iterator, store))}
                            </Context.Provider>
                        ),
                        this.props.any ? undefined : this.props.state || true,
                    )
                )}
            </IterableContext.Consumer>
        );
    }
}
