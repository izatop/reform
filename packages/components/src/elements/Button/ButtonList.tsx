import * as React from "react";
import {Helpers} from "../../helpers";
import {Size} from "../../enum";
import {MakeProps} from "../../interfaces";

const options = {
    name: "buttons",
    is: ["align"],
    are: ["size"],
    has: ["addons"],
};

export enum ButtonListAlign {
    Center = "centered",
    Right = "right",
}

export type ButtonListProps = MakeProps<{
    size?: Size;
    addons?: boolean;
    align?: ButtonListAlign;
}>;

export const ButtonList: React.FunctionComponent<ButtonListProps> = (props) => (
    <div className={Helpers.calcClasses(props, options)}>{props.children}</div>
);
