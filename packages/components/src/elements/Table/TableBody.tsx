import * as React from "react";
import {calcClasses} from "../../helpers";
import {MakeProps} from "../../interfaces";
import {TableCell} from "./TableCell";
import {TableRow} from "./TableRow";
import {TableRowContext} from "./TableRowContext";

export type TableBodyProps = MakeProps<{
    values?: React.ReactNode[][];
}>;

export const TableBody: React.FunctionComponent<TableBodyProps> = (props) => (
    <tbody className={calcClasses(props)}>
        <TableRowContext.Provider value={TableCell}>
            {props.values
                ? props.values.map((cells, i) => <TableRow key={i} cells={cells}/>)
                : props.children
            }
        </TableRowContext.Provider>
    </tbody>
);
