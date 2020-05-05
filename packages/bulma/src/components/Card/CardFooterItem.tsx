import * as React from "react";
import {MakeProps, XProps} from "../../interfaces";
import {ConfigFactory} from "../../utils";

export interface ICardFooterItem extends XProps<"p"> {
    children: React.ReactNode | React.ReactNode[];
}

const config = ConfigFactory.create({component: "card-footer-item"});
export const CardFooterItem = config.factory<MakeProps, ICardFooterItem>(({props, children}) => (
    <p {...props}>{children}</p>
));
