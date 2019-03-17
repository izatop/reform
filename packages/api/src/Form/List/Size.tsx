import * as React from "react";
import {IterableContext, IterableReceiver} from "../../Context";

export class Size<P = {}> extends IterableReceiver {
    public static contextType = IterableContext;

    public state = {
        count: this.context.count(),
    };

    public onStoreUpdate() {
        this.setState({count: this.context.count()});
    }

    public render() {
        return this.state.count;
    }
}
