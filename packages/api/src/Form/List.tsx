import * as React from "react";
import {IterableContext, Receiver} from "../Context";
import {Iterator} from "../Store";
import {receiver} from "./receiver";

export interface IListProps {
    name: string;
}

export class ListComponent extends Receiver<IListProps> {
    public state = {version: 1};

    protected iterator: Iterator;

    constructor(props: any) {
        super(props);

        this.iterator = this.props.store.mount(this.props.name, Iterator);
        this.iterator.listen(() => {
            this.setState({version: this.state.version++}, () => {
                this.props.store.compute();
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

export const List = receiver(ListComponent);
