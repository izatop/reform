import * as React from "react";
import {XProps} from "../../interfaces";
import {ElementFactory} from "../../utils";

export type FieldStateProps = XProps<"fieldset">;

export const config = ElementFactory.create({displayName: "FieldState"});

export const FieldState = config.factory<{}, FieldStateProps>(({props, children}) => {
    return (
        <fieldset {...props}>{children}</fieldset>
    );
});
