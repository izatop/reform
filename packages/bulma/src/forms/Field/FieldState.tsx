import * as React from "react";
import {XProps} from "../../interfaces";
import {ElementFactory} from "../../utils";

export const config = ElementFactory.create({displayName: "FieldState"});
export const FieldState = config.factory<{}, XProps<"fieldset">>(({props, children}) => {
    return (
        <fieldset {...props}>{children}</fieldset>
    );
});
