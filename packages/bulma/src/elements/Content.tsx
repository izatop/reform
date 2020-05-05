import React from "react";
import {MakeProps, XProps} from "../interfaces";
import {ConfigFactory} from "../utils";

const config = ConfigFactory.create({component: "content"});
export const Content = config.factory<MakeProps, XProps<"div">>(({props, children}) => (
    <div {...props}>{children}</div>));
