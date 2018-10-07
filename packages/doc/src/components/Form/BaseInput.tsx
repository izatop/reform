/* @id BaseInput.tsx */

import {Component} from "@reform/api";
import * as React from "react";

export interface IBaseProps {
    placeholder?: string;
    autoComplete?: string;
    style?: React.CSSProperties;
    className?: string;
}

export abstract class BaseInput<T, P = {}> extends Component<T, P & IBaseProps> {
    protected abstract type: string;

    protected onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.update(e.target.value);
    }

    protected get className() {
        if (!this.valid) {
            return "is-not-valid";
        }

        if (this.changed) {
            return "is-changed";
        }

        return "";
    }

    public render() {
        return <input {...this.getDefaultInputProps()}/>;
    }

    protected getDefaultInputProps() {
        return {
            autoComplete: this.props.autoComplete || "off",
            placeholder: this.props.placeholder,
            className: `${this.className} ${this.props.className}`,
            onChange: this.onChange,
            style: this.props.style,
            value: this.value,
            name: this.name,
            type: this.type,
        }
    }
}
