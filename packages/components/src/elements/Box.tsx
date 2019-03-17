import React from "react";
import {Helpers} from "../helpers";
import {MakeProps} from "../interfaces";

export type BoxProps = MakeProps;
export const Box: React.FunctionComponent<BoxProps> = (props) => {
    return <div className={Helpers.calcClasses(props, {name: "box"})}>{props.children}</div>;
};

Box.displayName = "Box";
