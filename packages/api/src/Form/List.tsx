import * as React from "react";
import {IterableContext, Receiver} from "../Context";
import {ElementIterable} from "../Store";
import {IdealState} from "./List/IdealState";
import {NonIdealState} from "./List/NonIdealState";
import {ListContext} from "./ListContext";

export interface IListProps {
    name: string;
}

export class List extends Receiver<IListProps> {
    public static Context = ListContext;
    public static IdealState = IdealState;
    public static NonIdealState = NonIdealState;

    public state = {version: 1};

    protected iterator: ElementIterable;

    constructor(props: any, context: any) {
        super(props, context);

        this.iterator = this.store.mount(this.props.name, ElementIterable);
        this.iterator.listen(() => {
            this.setState({version: this.iterator.version}, () => {
                this.store.compute();
            });
        });
    }

    public render() {
        return (
            <IterableContext.Provider value={{iterator: this.iterator, version: this.iterator.version}}>
                {this.props.children}
            </IterableContext.Provider>
        );
    }
}
