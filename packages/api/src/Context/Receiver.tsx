import * as React from "react";
import {IComponentState, IReceiverProps} from "../interfaces";

export abstract class Receiver<P = {}, S = any> extends React.PureComponent<P & IReceiverProps, S> {
    constructor(props: P & IReceiverProps) {
        super(props);
        const fn = this.onStoreUpdate.bind(this);
        this.onStoreUpdate = (...args: any[]) => fn(...args);
    }

    public static getDerivedStateFromProps(props: IReceiverProps, prevState: IComponentState) {
        if (props.store.version !== prevState.version) {
            return {
                ...prevState,
                version: props.store.version,
            };
        }

        return null;
    }

    public componentDidMount() {
        this.props.store.listen(this.onStoreUpdate);
    }

    public componentWillUnmount() {
        this.props.store.off(this.onStoreUpdate);
    }

    protected onStoreUpdate() {
        return ;
    }
}
