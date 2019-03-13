import * as React from "react";
import {Helpers} from "../../helpers";
import {MakeProps} from "../../interfaces";

export type ControlIcons = "left" | "right" | "both";

export interface IControlProps extends MakeProps {
    children: React.ReactNode;
    type?: React.ReactNode;
    state?: React.ReactNode;
    icons?: ControlIcons;
    expand?: boolean;
}

export const ControlOptions = {
    name: "control",
    is: [{expand: () => "expanded"}],
    has: [{
        icons: (v: ControlIcons) => v === "both"
            ? ["icons-left", "icons-right"]
            : `icons-${v}`,
    }],
};

export const Control: React.FC<IControlProps> = (props) => (
    <div className={Helpers.calcClasses(props, ControlOptions)}>{props.children}</div>
);
