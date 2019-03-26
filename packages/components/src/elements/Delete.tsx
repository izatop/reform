import * as React from "react";
import {XProps} from "../interfaces";
import {SizeType} from "../options";
import {MakeProps} from "../type";
import {ElementFactory} from "../utils";

export interface IDelete {
    "is-size"?: SizeType;
}

const config = ElementFactory.create({component: "delete"});
export const Delete = config.factory<MakeProps<IDelete>, XProps<"a">>(({props, children}) => {
    return <a {...props}>{children}</a>;
});
