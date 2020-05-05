import * as React from "react";
import {XProps} from "../../interfaces";
import {IsSize} from "../../props";
import {MakeProps} from "../../type";
import {ElementFactory} from "../../utils";

export type LabelProps = XProps<"label"> & {
    children: React.ReactNode;
};

const config = ElementFactory.create({component: "label"});
export const Label = config.factory<MakeProps<IsSize>, LabelProps>(({props, children}) => (
    <label {...props}>{children}</label>
));
