import React from "react";
import {ElementFactory} from "../../utils";

const config = ElementFactory.create({component: "media-left"});

export const MediaLeft = config.factory(({props, children}) => (
    <figure {...props}>{children}</figure>
));
