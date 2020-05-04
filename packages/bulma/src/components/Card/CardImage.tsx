import * as React from "react";
import {XProps} from "../../interfaces";
import {MakeProps} from "../../type";
import {ElementFactory} from "../../utils";

export interface ICardImage extends XProps<"div"> {
    children: React.ReactElement;
}

const config = ElementFactory.create({component: "card-image"});

export const CardImage = config.factory<MakeProps, ICardImage>(({props, children}) => (
    <div {...props}>{children}</div>
));
