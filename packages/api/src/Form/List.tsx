import * as React from "react";
import {IterableContext, Receiver} from "../Context";
import {ElementIterable} from "../Store";
import {IdealState} from "./List/IdealState";
import {NonIdealState} from "./List/NonIdealState";
import {ListContext} from "./ListContext";

export interface IListProps {
    name: string;
}

export type ListContextType = (data: ElementIterable) => React.ReactNode;

export class List extends Receiver<IListProps> {
    public static Context = ListContext;

    public static IdealState = IdealState;

    public static NonIdealState = NonIdealState;

    protected iterator!: ElementIterable;

    constructor(props: any, context: any) {
        super(props, context);

        this.iterator = this.context.mountArray(
            this.props.name,
            {
                validate: (value: any[]) => Array.isArray(value),
                compare: (v1, v2) => v1 === v2,
            },
        );
    }

    public componentDidMount() {
        super.componentDidMount();
        this.iterator.listen(() => {
            this.context.compute();
        });
    }

    public render() {
        return (
            <IterableContext.Provider value={this.iterator}>
                {this.props.children}
            </IterableContext.Provider>
        );
    }
}
