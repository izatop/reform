import React from "react";
import {XProps} from "../interfaces";
import {MakeBreakpoint} from "../type";
import {ConfigFactory} from "../utils";

interface IContainer {
    fluid?: boolean;
}

const config = ConfigFactory.create({component: "container"});
export const Container = config.factory<MakeBreakpoint<IContainer>, XProps<"div">>(({props, children}) => (
    <div {...props}>{children}</div>
));
