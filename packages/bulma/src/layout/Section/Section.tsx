import React from "react";
import {MakeProps, XProps} from "../../interfaces";
import {ConfigFactory} from "../../utils";

const config = ConfigFactory.create({component: "section"});
export const Section = config.factory<MakeProps, XProps<"section">>(({props, children}) => {
    return <section {...props}>{children}</section>;
});
