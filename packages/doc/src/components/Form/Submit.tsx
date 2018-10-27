/* @id Submit.tsx */

import * as React from "react";
import {BaseButton} from "./BaseButton";

export class Submit extends BaseButton {
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

    public render() {
        return (
            <button disabled={this.disabled}
                    className={this.className}
                    type={"submit"}>
                {this.state.ready
                    ? this.props.children
                    : "Submitting..."
                }
            </button>
        );
    }
}
