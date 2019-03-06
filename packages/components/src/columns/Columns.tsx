import React from "react";
import {calcClasses} from "../helpers";
import {ColumnsOptions, ColumnsProps} from "./props";

export const Columns: React.FunctionComponent<ColumnsProps> = (props) => (
    <div className={calcClasses(props, ColumnsOptions)}>{props.children}</div>
);
