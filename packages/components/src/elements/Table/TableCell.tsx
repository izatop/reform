import * as React from "react";
import {TableCellFactory} from "./props";

export const TableCell: TableCellFactory = (props) => (
    <td>{props.children}</td>
);

TableCell.displayName = "TableCell";
