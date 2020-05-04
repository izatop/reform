import * as React from "react";
import {MakeProps} from "../../type";
import {TableHeadCell} from "./TableHeadCell";
import {TableRow} from "./TableRow";
import {TableRowContext} from "./TableRowContext";

export type TableFootProps = MakeProps<{
    cells?: React.ReactNode[];
}>;

export const TableFoot: React.FunctionComponent<TableFootProps> = (props) => (
    <tfoot>
    <TableRowContext.Provider value={TableHeadCell}>
        {props.cells ? <TableRow cells={props.cells}/> : props.children}
    </TableRowContext.Provider>
    </tfoot>
);

TableFoot.displayName = "TableFoot";
