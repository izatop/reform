import * as React from "react";
import {IterableReceiver} from "../../Context";

export class IdealState extends IterableReceiver {
    public render() {
        if (this.store.count() > 0) {
            return this.props.children;
        }

        return null;
    }
}
