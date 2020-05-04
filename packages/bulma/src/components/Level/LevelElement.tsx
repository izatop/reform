import React from "react";
import {MakeProps} from "../../type";
import {ElementFactory} from "../../utils";

const config = ElementFactory.create({component: "level-item"});

export interface ILevelElement {
    "has-text-centered"?: boolean;
}

export const LevelElement = config.factory<MakeProps<ILevelElement>>(({props, children}) => (
    <div {...props}>{children}</div>
));
