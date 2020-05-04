import React from "react";
import {XProps} from "../../interfaces";
import {MakeProps} from "../../type";
import {ElementFactory} from "../../utils";

const config = ElementFactory.create({component: "footer"});
export const Footer = config.factory<MakeProps, XProps<"footer">>(({props, children}) => (
    <footer {...props}>{children}</footer>
));
