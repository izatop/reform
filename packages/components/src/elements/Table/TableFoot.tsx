import * as React from "react";
import {Helpers} from "../../helpers";
import {MakeProps} from "../../interfaces";
import {TableHeadCell} from "./TableHeadCell";
import {TableRow} from "./TableRow";
import {TableRowContext} from "./TableRowContext";

export type TableFootProps = MakeProps<{
    cells?: React.ReactNode[];
}>;

export const TableFoot: React.FunctionComponent<TableFootProps> = (props) => (
    <tfoot className={Helpers.calcClasses(props)}>
    <TableRowContext.Provider value={TableHeadCell}>
        {props.cells ? <TableRow cells={props.cells}/> : props.children}
    </TableRowContext.Provider>
    </tfoot>
);

TableFoot.displayName = "TableFoot";
