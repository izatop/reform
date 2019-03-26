import React from "react";
import {MakeProps} from "../type";
import {ElementFactory} from "../utils";

interface IContainer {
    "is-fluid"?: boolean;
}

const config = ElementFactory.create({component: "container"});

export const Container = config.factory<MakeProps<IContainer>>(({props, children}) => (
    <div {...props}>{children}</div>
));
