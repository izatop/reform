import {Receiver} from "@reform/api";
import {Button as ButtonComponent, ButtonType} from "@reform/components";
import * as React from "react";

export class Button extends Receiver<{}> {
    public state = {
        valid: this.context.valid,
        changed: this.context.changed,
        ready: this.context.ready,
    };

    protected type: ButtonType = "button";

    protected get disabled() {
        return !this.state.valid || !this.state.ready;
    }

    public render() {
        return (
            <ButtonComponent disabled={this.disabled}
                             type={this.type}>
                {this.props.children}
            </ButtonComponent>
        );
    }

    protected disposable = () => {
        const {valid, changed, ready} = this.context;
        this.setState({valid, changed, ready});
    }
}
