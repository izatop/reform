import React from "react";
import {ElementFactory} from "../../utils";

const config = ElementFactory.create({component: "media"});

export const Media = config.factory(({props, children}) => (
    <article {...props}>{children}</article>
));
