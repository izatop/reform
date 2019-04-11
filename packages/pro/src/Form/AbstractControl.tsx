import {Component} from "@reform/api";
import {Color} from "@reform/components";
import * as React from "react";

export interface IAbstractControl {
    className?: string;
    style?: React.CSSProperties;
}

export abstract class AbstractControl<T, P = {}> extends Component<T, P & IAbstractControl> {
    protected get color() {
        if (!this.valid) {
            return Color.Danger;
        }

        if (this.changed) {
            return Color.Success;
        }

        return undefined;
    }

    public abstract render(): React.ReactNode;

    protected getControlProps() {
        return {
            "is-color": this.color,
            "className": this.props.className,
            "style": this.props.style,
            "name": this.props.name,
        };
    }
}
