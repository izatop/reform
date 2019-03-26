import * as React from "react";
import {TableCellFactory} from "./props";

export const TableHeadCell: TableCellFactory = (props) => (
    <th>{props.children}</th>
);

TableHeadCell.displayName = "TableHeadCell";
