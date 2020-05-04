import * as React from "react";
import {ColorType, SizeType} from "../../options";
import {MakeProps} from "../../type";
import {ElementFactory} from "../../utils";

export interface ITag {
    "is-color"?: ColorType;
    "is-size"?: SizeType;
    "is-rounded"?: boolean;
    "is-delete"?: boolean;
}

const config = ElementFactory.create({component: "tag"});

export const Tag = config.factory<MakeProps<ITag>>(({props, children, options}) => (
    options["is-delete"] ? <a {...props}/> : <span {...props}>{children}</span>
));
