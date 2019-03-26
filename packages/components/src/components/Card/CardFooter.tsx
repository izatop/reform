import * as React from "react";
import {MakeProps} from "../../type";
import {ElementFactory} from "../../utils";
import {CardFooterItem} from "./CardFooterItem";

export interface ICardFooter {
    children: React.ReactElement[] | React.ReactElement;
}

const config = ElementFactory.create({component: "card-footer"});

export const CardFooter = config.factory<MakeProps, ICardFooter>(({props, children}) => (
    <footer {...props}>
        {React.Children.toArray(children).map((child, key) => (
            <CardFooterItem key={key}>{child}</CardFooterItem>
        ))}
    </footer>
));
