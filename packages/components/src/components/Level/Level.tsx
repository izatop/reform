import React from "react";
import {XProps} from "../../interfaces";
import {MakeBreakpoint} from "../../type";
import {ElementFactory} from "../../utils";

const config = ElementFactory.create({component: "level"});

export const Level = config.factory<MakeBreakpoint, XProps<"nav">>(({props, children}) => (
    <nav {...props}>{children}</nav>
));
