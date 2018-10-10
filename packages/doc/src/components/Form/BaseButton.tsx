/* @id BaseButton.tsx */

import {Receiver} from "@reform/api";
import * as React from "react";

export abstract class BaseButton extends Receiver<{}> {
    public state = {
        valid: this.props.store.valid,
        changed: this.props.store.changed,
        ready: this.props.store.ready,
    };

    protected abstract type = "button";

    protected get className() {
        return "";
    }

    protected get disabled() {
        return !this.state.valid || !this.state.ready;
    }

    public render() {
        return (
            <button disabled={this.disabled}
                    className={this.className}
                    type={this.type}>
                {this.props.children}
            </button>
        );
    }

    protected onStoreUpdate() {
        const {valid, changed, ready} = this.props.store;
        this.setState({valid, changed, ready});
    }
}
