import React from "react";
import {calcClasses} from "../../helpers";
import {MakeBreakpointProps} from "../../interfaces";

const LevelRightOptions = {name: "level-right"};
export type LevelRightProps = MakeBreakpointProps;
export const LevelRight: React.FunctionComponent<LevelRightProps> = (props) => (
    <nav className={calcClasses(props, LevelRightOptions)}>{props.children}</nav>
);
