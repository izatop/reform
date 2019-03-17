import React from "react";
import {Helpers} from "../helpers";
import {ColumnsOptions, ColumnsProps} from "./props";

export const Columns: React.FunctionComponent<ColumnsProps> = (props) => (
    <div className={Helpers.calcClasses(props, ColumnsOptions)}>{props.children}</div>
);

Columns.displayName = "Columns";
