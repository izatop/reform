import * as React from "react";
import {ReactElement} from "react";
import {MakeProps} from "../../type";
import {ElementFactory} from "../../utils";

export interface ICardProps {
    children: ReactElement | ReactElement[];
}

const config = ElementFactory.create({component: "card"});

export const Card = config.factory<MakeProps, ICardProps>(({props, children}) => (
    <div {...props}>{children}</div>
));
