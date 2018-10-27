import * as React from "react";
import {ElementIterable, Store} from "../Store";
import {FormContext, IterableContext} from "./Contexts";

export abstract class IterableReceiver<P = {}, S = any> extends React.PureComponent<P, S> {
    public static contextType = IterableContext;

    public context!: { iterator: ElementIterable, version: number };

    constructor(props: P, context: any) {
        super(props, context);
    }

    public get store() {
        return this.context.iterator;
    }

    public componentDidMount() {
        this.store.listen(this.disposable);
    }

    public componentWillUnmount() {
        this.store.off(this.disposable);
    }

    protected disposable = () => this.onStoreUpdate();

    protected onStoreUpdate() {
        return;
    }
}
