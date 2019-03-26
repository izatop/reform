import React from "react";
import {ElementFactory} from "../utils";

const config = ElementFactory.create({component: "content"});
export const Content = config.factory(({props, children}) => (<div {...props}>{children}</div>));
