import React from "react";
import {XProps} from "../../interfaces";
import {MakeProps} from "../../type";
import {ElementFactory} from "../../utils";

const config = ElementFactory.create({component: "media-left"});
export const MediaLeft = config.factory<MakeProps, XProps<"figure">>(({props, children}) => (
    <figure {...props}>{children}</figure>
));
