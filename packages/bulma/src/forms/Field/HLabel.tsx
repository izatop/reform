import * as React from "react";
import {XProps} from "../../interfaces";
import {IsSize} from "../../props";
import {MakeProps} from "../../type";
import {ElementFactory} from "../../utils";
import {Label} from "./Label";

export type HLabelProps = XProps<"label"> & {
    children: React.ReactNode;
};

const config = ElementFactory.create({component: "field-label"});

export const HLabel = config.factory<MakeProps<IsSize>, HLabelProps>(({props, children}) => (
    <label {...props}>
        <Label>{children}</Label>
    </label>
));
