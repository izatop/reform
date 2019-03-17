import * as React from "react";
import {Size} from "../../enum";
import {Helpers} from "../../helpers";
import {MakeProps} from "../../interfaces";

export interface ILabelProps extends MakeProps {
    children: string;
    size?: Size;
}

const LabelOptions = {
    name: "label",
    is: ["size"],
};

export const Label: React.FC<ILabelProps> = (props) => (
    <label className={Helpers.calcClasses(props, LabelOptions)}>{props.children}</label>
);

Label.displayName = "Label";
