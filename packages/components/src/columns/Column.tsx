import React from "react";
import {calcClasses} from "../helpers";
import {ColumnOptions, ColumnProps} from "./props";

export const Column: React.FunctionComponent<ColumnProps> = (props) => (
    <div className={calcClasses(props, ColumnOptions)}>{props.children}</div>
);
