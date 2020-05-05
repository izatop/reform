import React from "react";
import {XProps} from "../interfaces";
import {MakeProps} from "../type";
import {ConfigFactory} from "../utils";

const config = ConfigFactory.create({component: "content"});
export const Content = config.factory<MakeProps, XProps<"div">>(({props, children}) => (
    <div {...props}>{children}</div>));
