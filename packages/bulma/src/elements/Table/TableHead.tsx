import * as React from "react";
import {MakeProps} from "../../interfaces";
import {TableHeadCell} from "./TableHeadCell";
import {TableRow} from "./TableRow";
import {TableRowContext} from "./TableRowContext";

export type TableHeadProps = MakeProps<{
    cells?: React.ReactNode[];
}>;

export const TableHead: React.FunctionComponent<TableHeadProps> = (props) => (
    <thead>
        <TableRowContext.Provider value={TableHeadCell}>
            {props.cells ? <TableRow cells={props.cells}/> : props.children}
        </TableRowContext.Provider>
    </thead>
);

TableHead.displayName = "TableHead";
