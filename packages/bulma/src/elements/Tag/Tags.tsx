import * as React from "react";
import {SizeType} from "../../options";
import {MakeProps} from "../../type";
import {ElementFactory} from "../../utils";

export interface ITags {
    "has-addons"?: boolean;
    "are-size"?: SizeType;
}

const config = ElementFactory.create({component: "tags"});

export const Tags = config.factory<MakeProps<ITags>>(({props, children}) => (
    <span {...props}>{children}</span>
));
