import * as React from "react";
import {ITableSource} from "./props";
import {ITableStoreProperty} from "./TableStore";

export interface ITableProperty<T extends ITableSource> extends Omit<ITableStoreProperty<T>, "key"> {
    children?: (row: T) => React.ReactNode;
}

export const TableProperty: React.FC<ITableProperty<any>> = () => null;
