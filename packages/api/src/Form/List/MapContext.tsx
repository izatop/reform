import * as React from "react";
import {FormContext, IterableContext} from "../../Context";
import {ElementIterableHelper, Store} from "../../Store";

export interface IMapContextProps {
    children: (store: Store, helper: ElementIterableHelper) => React.ReactNode;
}

export class MapContext extends React.PureComponent<IMapContextProps> {
    public render() {
        return (
            <IterableContext.Consumer>
                {({iterator, version}) => (
                    iterator.map(
                        (store, id) => (
                            <FormContext.Provider key={id} value={{store, version}}>
                                {this.props.children(store, new ElementIterableHelper(iterator, store))}
                            </FormContext.Provider>
                        ),
                    )
                )}
            </IterableContext.Consumer>
        );
    }
}
