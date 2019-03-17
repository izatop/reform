import {Button as ButtonComponent, ButtonState, ButtonType, Color} from "@reform/components";
import * as React from "react";
import {Button} from "./Button";

export class Submit extends Button {
    protected type: ButtonType = "submit";

    protected get color() {
        if (!this.state.valid) {
            return Color.Warning;
        }

        return Color.Primary;
    }

    protected get disabled() {
        return !this.state.valid || !this.state.changed;
    }

    public render() {
        const state = !this.state.ready ? ButtonState.Loading : undefined;
        return (
            <ButtonComponent disabled={this.disabled}
                             state={state}
                             color={this.color}
                             type={"submit"}>
                {this.props.children}
            </ButtonComponent>
        );
    }
}
