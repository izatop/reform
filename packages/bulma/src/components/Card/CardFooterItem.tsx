import * as React from "react";
import {XProps} from "../../interfaces";
import {MakeProps} from "../../type";
import {ElementFactory} from "../../utils";

export interface ICardFooterItem extends XProps<"p"> {
    children: React.ReactNode | React.ReactNode[];
}

const config = ElementFactory.create({component: "card-footer-item"});

export const CardFooterItem = config.factory<MakeProps, ICardFooterItem>(({props, children}) => (
    <p {...props}>{children}</p>
));
