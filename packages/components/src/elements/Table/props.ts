import {ReactNode} from "react";
import * as React from "react";
import {MakeProps} from "../../type";

export interface ITable {
    "is-fullwidth"?: boolean;
    "is-bordered"?: boolean;
    "is-striped"?: boolean;
    "is-narrow"?: boolean;
    "is-hoverable"?: boolean;
}

export type TableRowProps = MakeProps<{
    selected?: boolean;
    cells?: React.ReactNode[];
}>;

export type TableCellProps = MakeProps<{key?: string | number; children: ReactNode}>;
export type TableCellFactory = React.FunctionComponent<TableCellProps>;
