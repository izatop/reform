import * as React from "react";
import {IterableReceiver} from "../../Context";
import {ElementIterable} from "../../Store";

export interface IListContainerProps {
    children: (iterator: ElementIterable) => React.ReactNode;
}

export class ListContainer<P = {}> extends IterableReceiver<P & IListContainerProps> {
    public render() {
        return this.props.children(this.context);
    }
}
