import * as React from "react";
import {Helpers} from "../../helpers";
import {TableRowOptions, TableRowProps} from "./props";
import {TableRowContext} from "./TableRowContext";

export const TableRow: React.FunctionComponent<TableRowProps> = (props) => {
    if (props.cells) {
        const values = props.cells;
        return (
            <tr>
                <TableRowContext.Consumer>
                    {(Cell) => values.map((value, i) => <Cell key={i}>{value}</Cell>)}
                </TableRowContext.Consumer>
            </tr>
        );
    }

    return (
        <tr className={Helpers.calcClasses(props, TableRowOptions)}>
            {props.children}
        </tr>
    );
};