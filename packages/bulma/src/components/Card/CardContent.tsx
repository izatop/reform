import * as React from "react";
import {MakeProps, XProps} from "../../interfaces";
import {ConfigFactory} from "../../utils";

export interface ICardContent extends XProps<"div"> {
    children: React.ReactNode;
}

const config = ConfigFactory.create({component: "card-content"});
export const CardContent = config.factory<MakeProps, ICardContent>(({props, children}) => (
    <div {...props}>{children}</div>
));
