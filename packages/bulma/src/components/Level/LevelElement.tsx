import React from "react";
import {XProps} from "../../interfaces";
import {MakeProps} from "../../type";
import {ConfigFactory} from "../../utils";

export interface ILevelElement {
    hasTextCentered?: boolean;
}

const config = ConfigFactory.create({
    component: "level-item",
    resolvers: {hasTextCentered: (v) => v && "has-text-centered"},
});

export const LevelElement = config.factory<MakeProps<ILevelElement>, XProps<"div">>(({props, children}) => (
    <div {...props}>{children}</div>
));
