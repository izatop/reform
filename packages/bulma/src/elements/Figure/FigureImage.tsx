import * as React from "react";
import {XProps} from "../../interfaces";
import {ElementFactory} from "../../utils";

export interface IFigureImage {
    "is-rounded"?: boolean;
}

const config = ElementFactory.create({displayName: "FigureImage"});

export const FigureImage = config.factory<IFigureImage, XProps<"img">>(({props}) => (
    <img {...props} />
));
