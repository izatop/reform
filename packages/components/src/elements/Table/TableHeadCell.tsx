import * as React from "react";
import {Helpers} from "../../helpers";
import {TableCellFactory} from "./props";

export const TableHeadCell: TableCellFactory = (props) => (
    <th className={Helpers.calcClasses(props)}>{props.children}</th>
);

TableHeadCell.displayName = "TableHeadCell";
