import * as React from "react";
import {Align, Size} from "../../enum";
import {Helpers} from "../../helpers";
import {MakeProps} from "../../interfaces";

const options = {
    name: "buttons",
    is: ["align"],
    are: ["size"],
    has: ["addons"],
};

export type ButtonListProps = MakeProps<{
    size?: Size;
    addons?: boolean;
    align?: Align;
}>;

export const ButtonList: React.FunctionComponent<ButtonListProps> = (props) => (
    <div className={Helpers.calcClasses(props, options)}>{props.children}</div>
);

ButtonList.displayName = "ButtonList";
