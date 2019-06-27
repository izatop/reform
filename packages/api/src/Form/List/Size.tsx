import * as React from "react";
import {IterableReceiver} from "../../Context";

export class Size<P = {}> extends IterableReceiver<P> {
    /*public state = {
        count: this.context.count(),
    };

    public onStoreUpdate() {
        this.setState({count: this.context.count()});
    }
*/
    public render() {
        return this.context.count();
    }
}
