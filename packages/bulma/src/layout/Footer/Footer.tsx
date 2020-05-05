import React from "react";
import {MakeProps, XProps} from "../../interfaces";
import {ConfigFactory} from "../../utils";

const config = ConfigFactory.create({component: "footer"});
export const Footer = config.factory<MakeProps, XProps<"footer">>(({props, children}) => (
    <footer {...props}>{children}</footer>
));
