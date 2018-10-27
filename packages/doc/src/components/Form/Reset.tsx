/* @id Reset.tsx */

import * as React from "react";
import {BaseButton} from "./BaseButton";

export class Reset extends BaseButton {
    protected type = "reset";

    protected get disabled() {
        return !this.state.changed || !this.state.ready;
    }
}
