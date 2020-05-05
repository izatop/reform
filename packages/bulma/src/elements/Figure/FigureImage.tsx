import * as React from "react";
import {XProps} from "../../interfaces";
import {ConfigFactory} from "../../utils";

export interface IFigureImage {
    rounded?: boolean;
}

const config = ConfigFactory.create({displayName: "FigureImage"});
export const FigureImage = config.factory<IFigureImage, XProps<"img">>(({props}) => (
    <img {...props} />
));
