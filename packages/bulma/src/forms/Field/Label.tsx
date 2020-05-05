import * as React from "react";
import {MakeProps, XProps} from "../../interfaces";
import {IsSize} from "../../props";
import {ConfigFactory} from "../../utils";

export type LabelProps = XProps<"label"> & {
    children: React.ReactNode;
};

const config = ConfigFactory.create({component: "label"});
export const Label = config.factory<MakeProps<IsSize>, LabelProps>(({props, children}) => (
    <label {...props}>{children}</label>
));
