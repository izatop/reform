import React from "react";
import {ElementFactory} from "../../utils";

const config = ElementFactory.create({component: "level-left"});

export const LevelLeft = config.factory(({props, children}) => (
    <div {...props}>{children}</div>
));
