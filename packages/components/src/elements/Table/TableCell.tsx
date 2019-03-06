import * as React from "react";
import {calcClasses} from "../../helpers";
import {TableCellFactory} from "./props";

export const TableCell: TableCellFactory = (props) => (
    <td className={calcClasses(props)}>{props.children}</td>
);
