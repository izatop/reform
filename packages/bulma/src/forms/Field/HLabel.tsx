import * as React from "react";
import {XProps} from "../../interfaces";
import {MakeProps} from "../../type";
import {ElementFactory} from "../../utils";
import {ILabel, Label} from "./Label";

export type HLabelProps = XProps<"label"> & {
    children: React.ReactNode;
};

const config = ElementFactory.create({component: "field-label"});

export const HLabel = config.factory<MakeProps<ILabel>, HLabelProps>(({props, children}) => (
    <label {...props}>
        <Label>{children}</Label>
    </label>
));
