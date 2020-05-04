import * as React from "react";
import {XProps} from "../../interfaces";
import {SizeType} from "../../options";
import {MakeProps} from "../../type";
import {ElementFactory} from "../../utils";

export interface ILabel {
    "is-size"?: SizeType;
}

export type LabelProps = XProps<"label"> & {
    children: React.ReactNode;
};

const config = ElementFactory.create({component: "label"});

export const Label = config.factory<MakeProps<ILabel>, LabelProps>(({props, children}) => (
    <label {...props}>{children}</label>
));
