import React from "react";
import {MakeBreakpoint, XProps} from "../../interfaces";
import {ConfigFactory} from "../../utils";

const config = ConfigFactory.create({component: "level"});
export const Level = config.factory<MakeBreakpoint, XProps<"nav">>(({props, children}) => (
    <nav {...props}>{children}</nav>
));
