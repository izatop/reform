import React from "react";
import {Helpers} from "../../helpers";
import {MakeBreakpointProps} from "../../interfaces";

const LevelItemOptions = {
    name: "level-item",
    has: [{
        centered: () => "text-centered",
    }],
};

export type LevelItemProps = MakeBreakpointProps<{ centered?: true }>;
export const LevelItem: React.FunctionComponent<LevelItemProps> = (props) => (
    <nav className={Helpers.calcClasses(props, LevelItemOptions)}>{props.children}</nav>
);

LevelItem.displayName = "LevelItem";
