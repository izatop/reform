import * as React from "react";
import {FormContext, IterableContext} from "../../Context";
import {MapContext} from "./MapContext";

export interface IMapProps {
    children: React.ReactNode;
}

export class Map<P = {}> extends React.Component<IMapProps & P> {
    public static Context = MapContext;

    public render() {
        return (
            <IterableContext.Consumer>
                {({iterator, version}) => (
                    iterator.map(
                        (store, id) => (
                            <FormContext.Provider key={id} value={{store, version}}>
                                {this.props.children}
                            </FormContext.Provider>
                        ),
                    )
                )}
            </IterableContext.Consumer>
        );
    }
}
