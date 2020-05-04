import React from "react";
import {XProps} from "../../interfaces";
import {MakeProps} from "../../type";
import {ElementFactory} from "../../utils";

const config = ElementFactory.create({component: "section"});
export const Section = config.factory<MakeProps, XProps<"section">>(({props, children}) => {
    return <section {...props}>{children}</section>;
});
