import {Receiver} from "@reform/api";
import {Button as ButtonComponent, ButtonState, ButtonType, Color} from "@reform/components";
import * as React from "react";

export class Button extends Receiver<{}> {
    public state = {
        valid: this.context.valid,
        changed: this.context.changed,
        ready: this.context.ready,
        loading: false,
    };

    protected type: ButtonType = "button";

    protected get color(): Color | undefined {
        return undefined;
    }

    protected get disabled() {
        return !this.state.valid || !this.state.ready;
    }

    public render() {
        const buttonState = this.state.loading ? ButtonState.Loading : undefined;
        return (
            <ButtonComponent disabled={this.disabled}
                             state={buttonState}
                             color={this.color}
                             onClick={this.handleClick}
                             type={this.type}>
                {this.props.children}
            </ButtonComponent>
        );
    }

    protected handleClick = () => {
        this.setState({loading: true});
    }

    protected disposable = () => {
        const {valid, changed, ready} = this.context;
        this.setState({valid, changed, ready, loading: false});
    }
}
