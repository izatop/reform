import {ButtonType} from "@reform/components";
import * as React from "react";
import {Button} from "./Button";

export class Reset extends Button {
    protected type: ButtonType = "reset";

    protected get disabled() {
        return !this.state.changed || !this.state.ready;
    }
}
