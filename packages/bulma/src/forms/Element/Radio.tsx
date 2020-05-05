import * as React from "react";
import {XProps} from "../../interfaces";
import {MakeProps} from "../../type";
import {ElementFactory} from "../../utils";

const config = ElementFactory.create({component: "radio"});
export const Radio = config.factory<MakeProps, XProps<"input">>(({props, children}) => (
    <label className={"radio"}>
        <input type={"radio"}
               {...props} />
        &nbsp;{children}
    </label>
));
