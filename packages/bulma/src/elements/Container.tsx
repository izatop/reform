import React from "react";
import {XProps} from "../interfaces";
import {MakeProps} from "../type";
import {ElementFactory} from "../utils";

interface IContainer {
    "is-fluid"?: boolean;
}

const config = ElementFactory.create({component: "container"});

export const Container = config.factory<MakeProps<IContainer>, XProps<"div">>(({props, children}) => (
    <div {...props}>{children}</div>
));
