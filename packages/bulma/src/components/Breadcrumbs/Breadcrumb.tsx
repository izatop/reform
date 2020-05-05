import * as React from "react";
import {XProps} from "../../interfaces";
import {IsActive} from "../../props";
import {MakeProps} from "../../type";
import {ElementFactory} from "../../utils";

const config = ElementFactory.create({displayName: "breadcrumb"});
export const Breadcrumb = config.factory<MakeProps<IsActive>, XProps<"li">>(({props, children}) => (
    <li {...props}>{children}</li>
));
