import * as React from "react";
import {Helpers} from "../../helpers";
import {TableCellFactory} from "./props";

export const TableCell: TableCellFactory = (props) => (
    <td className={Helpers.calcClasses(props)}>{props.children}</td>
);

TableCell.displayName = "TableCell";
