import * as React from "react";
import {IterableReceiver} from "../../Context";

export class Size<P = {}> extends IterableReceiver<P> {
    public render() {
        return this.context.count();
    }
}
