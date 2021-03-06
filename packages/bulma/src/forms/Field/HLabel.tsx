import * as React from "react";
import {MakeProps, XProps} from "../../interfaces";
import {IsSize} from "../../props";
import {ConfigFactory} from "../../utils";
import {Label} from "./Label";

export type HLabelProps = XProps<"label"> & {
    children: React.ReactNode;
};

const config = ConfigFactory.create({component: "field-label"});

export const HLabel = config.factory<MakeProps<IsSize>, HLabelProps>(({props, children}) => (
    <label {...props}>
        <Label>{children}</Label>
    </label>
));
