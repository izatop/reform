import * as React from "react";
import {calcClasses} from "../../helpers";
import {TableCellFactory} from "./props";

export const TableHeadCell: TableCellFactory = (props) => (
    <th className={calcClasses(props)}>{props.children}</th>
);
