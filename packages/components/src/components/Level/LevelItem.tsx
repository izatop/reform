import React from "react";
import {calcClasses} from "../../helpers";
import {MakeBreakpointProps} from "../../interfaces";

const LevelItemOptions = {
    name: "level-item",
    has: [{
        centered: () => "text-centered",
    }],
};

export type LevelItemProps = MakeBreakpointProps<{ centered?: true }>;
export const LevelItem: React.FunctionComponent<LevelItemProps> = (props) => (
    <nav className={calcClasses(props, LevelItemOptions)}>{props.children}</nav>
);
