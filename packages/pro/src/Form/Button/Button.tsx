import {Receiver} from "@reform/api";
import {Button as ButtonComponent, Color} from "@reform/components";
import * as React from "react";

export class Button extends Receiver<{}> {
    public state = {
        valid: this.context.valid,
        changed: this.context.changed,
        ready: this.context.ready,
        loading: false,
    };

    protected type = "button";

    protected get color(): Color | undefined {
        return undefined;
    }

    protected get disabled() {
        return !this.state.valid || !this.state.ready;
    }

    public render() {
        return (
            <ButtonComponent disabled={this.disabled}
                             is-color={this.color}
                             is-loading={this.state.loading}
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
