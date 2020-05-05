import React from "react";
import {XProps} from "../interfaces";
import {MakeProps} from "../type";
import {ElementFactory} from "../utils";

const config = ElementFactory.create({displayName: "div"});
export const Div = config.factory<MakeProps, XProps<"div">>(({props, children}) => (
    <div {...props}>{children}</div>
));
