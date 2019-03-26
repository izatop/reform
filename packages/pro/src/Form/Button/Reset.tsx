import * as React from "react";
import {Button} from "./Button";

export class Reset extends Button {
    protected type = "reset";

    protected get disabled() {
        return !this.state.changed || !this.state.ready;
    }
}
