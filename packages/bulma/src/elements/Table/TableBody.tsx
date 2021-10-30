import * as React from "react";
import {MakeProps} from "../../interfaces";
import {TableCell} from "./TableCell";
import {TableRow} from "./TableRow";
import {TableRowContext} from "./TableRowContext";

export type TableBodyProps = MakeProps<{
    values?: React.ReactNode[][];
    indexKey?: number;
}>;

export const TableBody: React.FunctionComponent<TableBodyProps> = (props) => (
    <tbody>
        <TableRowContext.Provider value={TableCell}>
            {props.values
                ? props.values.map((cells, i) => (
                    <TableRow key={`${props.indexKey ? cells[props.indexKey] || i : i}`} cells={cells}/>
                ))
                : props.children
            }
        </TableRowContext.Provider>
    </tbody>
);

TableBody.defaultProps = {indexKey: 0};

TableBody.displayName = "TableBody";
