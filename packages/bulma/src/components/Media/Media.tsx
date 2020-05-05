import React from "react";
import {XProps} from "../../interfaces";
import {MakeProps} from "../../type";
import {ElementFactory} from "../../utils";

const config = ElementFactory.create({component: "media"});
export const Media = config.factory<MakeProps, XProps<"article">>(({props, children}) => (
    <article {...props}>{children}</article>
));
