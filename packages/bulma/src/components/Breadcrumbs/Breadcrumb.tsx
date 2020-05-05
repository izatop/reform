import * as React from "react";
import {MakeProps, XProps} from "../../interfaces";
import {IsActive} from "../../props";
import {ConfigFactory} from "../../utils";

const config = ConfigFactory.create({displayName: "breadcrumb"});
export const Breadcrumb = config.factory<MakeProps<IsActive>, XProps<"li">>(({props, children}) => (
    <li {...props}>{children}</li>
));
