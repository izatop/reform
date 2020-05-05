import React from "react";
import {MakeProps, XProps} from "../../interfaces";
import {ConfigFactory} from "../../utils";

const config = ConfigFactory.create({component: "media-left"});
export const MediaLeft = config.factory<MakeProps, XProps<"figure">>(({props, children}) => (
    <figure {...props}>{children}</figure>
));
