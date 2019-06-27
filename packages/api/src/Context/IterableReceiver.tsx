import * as React from "react";
import {ElementIterable} from "../Store";
import {IterableContext} from "./Contexts";

export abstract class IterableReceiver<P = {}, S = any> extends React.Component<P, S> {
    public static contextType = IterableContext;

    public context!: ElementIterable;

    constructor(props: P, context: any) {
        super(props, context);
    }

    public componentDidMount() {
        this.context.listen(this.disposable);
    }

    public componentWillUnmount() {
        this.context.off(this.disposable);
    }

    protected disposable = () => this.onStoreUpdate();

    protected onStoreUpdate() {
        this.forceUpdate();
    }
}
