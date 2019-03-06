import React from "react";
import {calcClasses} from "../helpers";
import {MakeProps} from "../interfaces";

export type BoxProps = MakeProps;
export const Box: React.FunctionComponent<BoxProps> = (props) => {
    return <div className={calcClasses(props, {name: "box"})}>{props.children}</div>;
};
