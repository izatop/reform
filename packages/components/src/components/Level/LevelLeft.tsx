import React from "react";
import {calcClasses} from "../../helpers";
import {MakeBreakpointProps} from "../../interfaces";

const LevelLeftOptions = {name: "level-left"};
export type LevelLeftProps = MakeBreakpointProps;
export const LevelLeft: React.FunctionComponent<LevelLeftProps> = (props) => (
    <nav className={calcClasses(props, LevelLeftOptions)}>{props.children}</nav>
);
