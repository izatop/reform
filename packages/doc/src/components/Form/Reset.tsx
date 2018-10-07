/* @id Reset.tsx */

import {receiver} from "@reform/api";
import * as React from "react";
import {BaseButton} from "./BaseButton";

export class ResetComponent extends BaseButton {
    protected type = "reset";

    protected get disabled() {
        return !this.state.changed || !this.state.ready;
    }
}

export const Reset = receiver(ResetComponent);
