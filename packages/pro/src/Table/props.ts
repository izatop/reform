import * as React from "react";
import {TableStore} from "./TableStore";

export const TableStoreContext = React.createContext(new TableStore<any>([]));

export interface ITableSource {
    [key: string]: any;
}

export function isValidElement<P>(child: any, type: React.ElementType<P>): child is React.ReactElement<P> {
    if (!React.isValidElement(child)) {
        return false;
    }

    return child.type === type;
}
