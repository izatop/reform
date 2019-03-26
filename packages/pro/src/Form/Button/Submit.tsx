import {Color} from "@reform/components";
import * as React from "react";
import {Button} from "./Button";

export class Submit extends Button {
    protected type = "submit";

    protected get color() {
        if (!this.state.valid) {
            return Color.Warning;
        }

        return Color.Primary;
    }

    protected get disabled() {
        return !this.state.ready || !this.state.valid || !this.state.changed;
    }
}
