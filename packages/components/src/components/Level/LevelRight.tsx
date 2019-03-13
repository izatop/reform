import React from "react";
import {Helpers} from "../../helpers";
import {MakeBreakpointProps} from "../../interfaces";

const LevelRightOptions = {name: "level-right"};
export type LevelRightProps = MakeBreakpointProps;
export const LevelRight: React.FunctionComponent<LevelRightProps> = (props) => (
    <nav className={Helpers.calcClasses(props, LevelRightOptions)}>{props.children}</nav>
);
