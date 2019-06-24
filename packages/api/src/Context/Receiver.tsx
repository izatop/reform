import * as React from "react";
import {Store} from "../Store";
import {debounce} from "../utils";
import {StoreContext} from "./Contexts";

export abstract class Receiver<P = {}, S = any> extends React.Component<P, S> {
    public static contextType = StoreContext;

    public context!: Store;

    protected disposable?: () => void;

    constructor(props: P, context: any) {
        super(props, context);
    }

    public componentDidMount() {
        if (this.disposable) {
            this.context.listen(debounce(this.disposable));
        }
    }

    public componentWillUnmount() {
        if (this.disposable) {
            this.context.off(this.disposable);
        }
    }
}
