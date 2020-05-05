import React from "react";
import {MakeBreakpoint, XProps} from "../interfaces";
import {ConfigFactory} from "../utils";

interface IContainer {
    fluid?: boolean;
}

const config = ConfigFactory.create({component: "container"});
export const Container = config.factory<MakeBreakpoint<IContainer>, XProps<"div">>(({props, children}) => (
    <div {...props}>{children}</div>
));
