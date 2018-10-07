import * as React from "react";
import {Context, IterableContext} from "../../Context";

export interface IMapProps {
    any?: true;
    state?: boolean;
    children: React.ReactNode;
}

export class Map<P = {}> extends React.Component<IMapProps & P> {
    public render() {
        return (
            <IterableContext.Consumer>
                {({iterator, version}) => (
                    iterator.map(
                        (store, id) => (
                            <Context.Provider key={id} value={{store, version}}>
                                {this.props.children}
                            </Context.Provider>
                        ),
                        this.props.any ? undefined : this.props.state || true,
                    )
                )}
            </IterableContext.Consumer>
        );
    }
}
