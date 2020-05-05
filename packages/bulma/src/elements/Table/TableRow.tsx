import * as React from "react";
import {XProps} from "../../interfaces";
import {MakeProps} from "../../type";
import {ConfigFactory} from "../../utils";
import {TableRowContext} from "./TableRowContext";

export interface ITableRow {
    selected?: boolean;
}

export type TableRowProps = XProps<"tr"> & { cells?: React.ReactNode[] };

const config = ConfigFactory.create({displayName: "TableRow"});
export const TableRow = config.factory<MakeProps<ITableRow>, TableRowProps>(({props, children}) => {
    const {cells, ...p} = props;
    if (cells) {
        const values: React.ReactNode[] = cells;
        return (
            <tr {...p}>
                <TableRowContext.Consumer>
                    {(Cell) => values.map((value, i) => <Cell key={i}>{value}</Cell>)}
                </TableRowContext.Consumer>
            </tr>
        );
    }

    return (
        <tr {...p}>
            {children}
        </tr>
    );
});
