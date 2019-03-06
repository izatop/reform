import {ReactNode} from "react";
import * as React from "react";
import {MakeProps} from "../../interfaces";

export enum TableStyle {
    Bordered = "bordered",
    Striped = "striped",
    Narrow = "narrow",
    Hoverable = "hoverable",
}

export type TableProps = MakeProps<{
    style?: TableStyle | TableStyle;
    fullwidth?: boolean;
}>;

export const TableOptions = {
    name: "table",
    is: ["style", "fullwidth"],
};

export type TableRowProps = MakeProps<{
    selected?: boolean;
    cells?: React.ReactNode[];
}>;

export const TableRowOptions = {
    is: ["selected"],
};

export type TableCellProps = MakeProps<{key?: string | number; children: ReactNode}>;
export type TableCellFactory = React.FunctionComponent<TableCellProps>;
