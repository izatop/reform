import * as React from "react";
import {IterableReceiver} from "../../Context";

export interface ISizeTestProps {
    test: (count: number) => boolean;
}

export class SizeTest<P = {}> extends IterableReceiver<P & ISizeTestProps> {
    public render() {
        if (this.props.test(this.context.count())) {
            return this.props.children;
        }

        return null;
    }
}
