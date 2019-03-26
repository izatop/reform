import React from "react";
import {XProps} from "../../interfaces";
import {MakeProps} from "../../type";
import {ElementFactory} from "../../utils";

const config = ElementFactory.create({component: "section"});
export const Footer = config.factory<MakeProps, XProps<"section">>(({props, children}) => (
    <section {...props}>{children}</section>
));
