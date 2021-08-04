import * as React from "react";
import {XProps} from "../../interfaces";
import {ConfigFactory} from "../../utils";

export const config = ConfigFactory.create({displayName: "FieldState"});
export const FieldState = config.factory<Record<any, any>, XProps<"fieldset">>(({props, children}) => {
    return (
        <fieldset {...props}>{children}</fieldset>
    );
});
