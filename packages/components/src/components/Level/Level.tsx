import React from "react";
import {calcClasses} from "../../helpers";
import {MakeBreakpointProps} from "../../interfaces";

const LevelOptions = {name: "level"};
export type LevelProps = MakeBreakpointProps;
export const Level: React.FunctionComponent<LevelProps> = (props) => (
    <nav className={calcClasses(props, LevelOptions)}>{props.children}</nav>
);
