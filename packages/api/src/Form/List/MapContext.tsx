import * as React from "react";
import {FormContext, IterableContext} from "../../Context";
import {ElementIterableHelper, Store} from "../../Store";
import {ListContextType} from "../List";

export type MapContextType = (store: Store, helper: ElementIterableHelper) => React.ReactNode;

export interface IMapContextProps {
    children: MapContextType;
}

export class MapContext extends React.PureComponent<IMapContextProps> {
    private renderChild = this.props.children;

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
                <FormContext.Provider key={id} value={store}>
                    {this.renderChild(store, new ElementIterableHelper(iterator, store))}
                </FormContext.Provider>
            ),
        )
    )
}
