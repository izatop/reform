import React from "react";
import {XProps} from "../../interfaces";
import {MakeProps} from "../../type";
import {ElementFactory} from "../../utils";

const config = ElementFactory.create({component: "media-right"});
export const MediaRight = config.factory<MakeProps, XProps<"div">>(({props, children}) => (
    <div {...props}>{children}</div>
));
