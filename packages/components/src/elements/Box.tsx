import React from "react";
import {ElementFactory} from "../utils";

const config = ElementFactory.create({component: "box"});

export const Box = config.factory(({props, children}) => {
    return <div {...props}>{children}</div>;
});
