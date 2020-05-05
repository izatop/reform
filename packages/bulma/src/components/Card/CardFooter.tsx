import * as React from "react";
import {XProps} from "../../interfaces";
import {MakeProps} from "../../type";
import {ConfigFactory} from "../../utils";
import {CardFooterItem} from "./CardFooterItem";

export interface ICardFooter extends XProps<"footer"> {
    children: React.ReactElement[] | React.ReactElement;
}

const config = ConfigFactory.create({component: "card-footer"});
export const CardFooter = config.factory<MakeProps, ICardFooter>(({props, children}) => (
    <footer {...props}>
        {React.Children.toArray(children).map((child, key) => (
            <CardFooterItem key={key}>{child}</CardFooterItem>
        ))}
    </footer>
));
