import React from "react";
import {XProps} from "../interfaces";
import {ElementFactory} from "../utils";

const config = ElementFactory.create({component: "content"});
export const Content = config.factory<{}, XProps<"div">>(({props, children}) => (<div {...props}>{children}</div>));
