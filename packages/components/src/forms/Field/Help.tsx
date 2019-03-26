import * as React from "react";
import {ColorType} from "../../options";
import {MakeProps} from "../../type";
import {ElementFactory} from "../../utils";

export interface IHelp {
    "is-color"?: ColorType;
}

const config = ElementFactory.create({component: "help"});

export const Help = config.factory<MakeProps<IHelp>>(({props, children}) => (
    <p {...props}>{children}</p>
));
