import * as React from "react";
import {TableCellFactory} from "./props";
import {TableCell} from "./TableCell";

export const TableRowContext = React.createContext<TableCellFactory>(TableCell);
