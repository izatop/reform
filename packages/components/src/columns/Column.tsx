import React from "react";
import {Helpers} from "../helpers";
import {ColumnOptions, ColumnProps} from "./props";

export const Column: React.FunctionComponent<ColumnProps> = (props) => (
    <div className={Helpers.calcClasses(props, ColumnOptions)}>{props.children}</div>
);

Column.displayName = "Column";
