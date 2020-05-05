import * as React from "react";
import {XProps} from "../../interfaces";
import {MakeProps} from "../../type";
import {ElementFactory} from "../../utils";

const config = ElementFactory.create({component: "card-header-title"});
export const CardHeaderTitle = config.factory<MakeProps, XProps<"p">>(({props, children}) => (
    <p {...props}>{children}</p>
));
