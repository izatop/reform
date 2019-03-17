import * as React from "react";
import {IterableReceiver} from "../../Context";

export class NonIdealState extends IterableReceiver {
    public render() {
        if (this.context.count() > 0) {
            return null;
        }

        return this.props.children;
    }
}
