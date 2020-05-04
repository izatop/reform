import React from "react";
import {XProps} from "../interfaces";
import {ElementFactory} from "../utils";

const config = ElementFactory.create({component: "box"});

export const Box = config.factory<{}, XProps<"div">>(({props, children}) => {
    return <div {...props}>{children}</div>;
});
