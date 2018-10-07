/* @id Submit.tsx */

import {receiver} from "@reform/api";
import * as React from "react";
import {BaseButton} from "./BaseButton";

export class SubmitComponent extends BaseButton {
    protected type = "submit";

    protected get className() {
        if (!this.state.ready) {
            return "is-locked";
        }

        if (!this.state.valid) {
            return "is-not-valid";
        }

        return "";
    }

    render() {
        return (
            <button disabled={this.disabled}
                    className={this.className}
                    type={"submit"}>
                {this.state.ready
                    ? this.props.children
                    : "Submitting..."
                }
            </button>
        )
    }
}

export const Submit = receiver(SubmitComponent);
