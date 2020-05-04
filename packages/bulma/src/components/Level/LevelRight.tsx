import React from "react";
import {ElementFactory} from "../../utils";

const config = ElementFactory.create({component: "level-right"});

export const LevelRight = config.factory(({props, children}) => (
    <div {...props}>{children}</div>
));
