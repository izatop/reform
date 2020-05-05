import React from "react";
import {XProps} from "../../interfaces";
import {MakeProps} from "../../type";
import {ElementFactory} from "../../utils";

const config = ElementFactory.create({component: "level-right"});
export const LevelRight = config.factory<MakeProps, XProps<"div">>(({props, children}) => (
    <div {...props}>{children}</div>
));
