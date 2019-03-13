import React from "react";
import {Helpers} from "../helpers";
import {MakeBreakpointProps} from "../interfaces";

const ContainerOptions = {name: "container", is: ["fluid"]};
export type ContainerProps = MakeBreakpointProps<{ fluid?: true }>;
export const Container: React.FunctionComponent<ContainerProps> = (props) => {
    return <div className={Helpers.calcClasses(props, ContainerOptions)}>{props.children}</div>;
};
