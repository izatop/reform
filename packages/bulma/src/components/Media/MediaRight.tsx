import React from "react";
import {ElementFactory} from "../../utils";

const config = ElementFactory.create({component: "media-right"});

export const MediaRight = config.factory(({props, children}) => (
    <div {...props}>{children}</div>
));
