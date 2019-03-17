import * as React from "react";
import {Input} from "./Input";

export class Email<P = {}> extends Input<P> {
    protected type = "email";

    protected getControlProps() {
        return {
            autoComplete: "email",
            ...super.getControlProps(),
        };
    }
}
