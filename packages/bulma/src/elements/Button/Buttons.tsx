import * as React from "react";
import {XProps} from "../../interfaces";
import {MakeProps} from "../../type";
import {ElementFactory} from "../../utils";

interface IButtons {
    "has-addons"?: boolean;
    "is-centered"?: boolean;
    "is-right"?: boolean;
}

const config = ElementFactory.create({component: "buttons"});

export const Buttons = config.factory<MakeProps<IButtons>, XProps<"div">>(({props, children}) => (
    <div {...props}>{children}</div>
));
