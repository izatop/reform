import React from "react";
import {XProps} from "../../interfaces";
import {MakeProps} from "../../type";
import {ConfigFactory} from "../../utils";

const config = ConfigFactory.create({component: "footer"});
export const Footer = config.factory<MakeProps, XProps<"footer">>(({props, children}) => (
    <footer {...props}>{children}</footer>
));
