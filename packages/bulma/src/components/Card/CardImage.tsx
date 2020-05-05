import * as React from "react";
import {MakeProps, XProps} from "../../interfaces";
import {ConfigFactory} from "../../utils";

export interface ICardImage extends XProps<"div"> {
    children: React.ReactElement;
}

const config = ConfigFactory.create({component: "card-image"});
export const CardImage = config.factory<MakeProps, ICardImage>(({props, children}) => (
    <div {...props}>{children}</div>
));
