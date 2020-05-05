import * as React from "react";
import {XProps} from "../../interfaces";
import {MakeProps} from "../../type";
import {ElementFactory} from "../../utils";

export interface ICardContent extends XProps<"div"> {
    children: React.ReactNode;
}

const config = ElementFactory.create({component: "card-content"});
export const CardContent = config.factory<MakeProps, ICardContent>(({props, children}) => (
    <div {...props}>{children}</div>
));
