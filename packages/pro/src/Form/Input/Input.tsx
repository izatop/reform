import {Input as InputComponent} from "@reform/components";
import * as React from "react";
import {AbstractControl} from "../AbstractControl";
import {HTMLAutoCompleteType} from "../interface";

export interface IInput {
    autoFocus?: boolean;
    autoComplete?: HTMLAutoCompleteType;
    readOnly?: boolean;
    disabled?: boolean;
    placeholder?: string;
    type?: string;
}

export class Input<P = {}> extends AbstractControl<string | number, P & IInput> {
    protected type = this.props.type || "input";

    protected get initialValue() {
        return "";
    }

    public validate(value: string | number, required: boolean): boolean {
        if (!required) {
            return true;
        }

        if (typeof value === "string" && value.length > 0) {
            return true;
        }

        return !!(typeof value === "number" && value === value);
    }

    public render() {
        return <InputComponent onChange={this.onChange}
                               {...this.getControlProps()}/>;
    }

    protected getControlProps() {
        return {
            ...super.getControlProps(),
            type: this.type,
            value: this.value,
            autoFocus: this.props.autoFocus,
            placeholder: this.props.placeholder,
            autoComplete: this.props.autoComplete || "off",
            disabled: this.props.disabled,
            readOnly: this.props.readOnly,
        };
    }

    protected onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.update(e.currentTarget.value);
    }
}
