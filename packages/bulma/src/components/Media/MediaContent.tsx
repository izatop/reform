import React from "react";
import {ElementFactory} from "../../utils";

const config = ElementFactory.create({component: "media-content"});
export const MediaContent = config.factory(({props, children}) => (
    <div {...props}>{children}</div>
));
