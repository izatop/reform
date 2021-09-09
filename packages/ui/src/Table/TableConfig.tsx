import * as React from "react";
import {ITableRow, XProps} from "@reform/bulma";
import {ITableSource} from "./props";
import {ITableProperty} from "./TableProperty";

export interface ITableConfig<T extends ITableSource> {
    primary: keyof T & string;
    rowProps?: (data: T) => ITableRow & XProps<"tr">;
    children: React.ReactElement<ITableProperty<T>> | React.ReactElement<ITableProperty<T>>[];
}

export const TableConfig: React.FC<ITableConfig<any>> = () => null;
