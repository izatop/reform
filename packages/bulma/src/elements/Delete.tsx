import * as React from "react";
import {XProps} from "../interfaces";
import {IsSize} from "../props";
import {MakeProps} from "../type";
import {ConfigFactory} from "../utils";

const config = ConfigFactory.create({component: "delete"});
export const Delete = config.factory<MakeProps<IsSize>, XProps<"a">>(({props, children}) => {
    return <a {...props}>{children}</a>;
});
