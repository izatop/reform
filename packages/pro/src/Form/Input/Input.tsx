import {Input as InputComponent} from "@reform/components";
import * as React from "react";
import {AbstractControl, EL} from "../AbstractControl";
import {HTMLAutoCompleteType} from "../interface";

export interface IInput {
    autoComplete?: HTMLAutoCompleteType;
    readOnly?: boolean;
    disabled?: boolean;
    placeholder?: string;
}

export class Input<P = {}> extends AbstractControl<string | number, P & IInput> {
    protected type: string = "input";

    protected get initialValue() {
        return "";
    }

    public validate(value: string | number): boolean {
        if (!this.props.required) {
            return true;
        }

        if (typeof value === "string" && value.length > 0) {
            return true;
        }

        return !!(typeof value === "number" && value === value);
    }

    public render() {
        const props = this.createProps<HTMLInputElement>({
            onChange: (e) => this.update(e.target.value),
            type: this.type,
        });

        return <InputComponent {...this.getControlProps()}
                               props={props}/>;
    }

    protected createProps<ET>(props: EL<ET>) {
        return {
            ...super.createProps(props),
            placeholder: this.props.placeholder,
            autoComplete: this.props.autoComplete || "off",
            disabled: this.props.disabled,
            readOnly: this.props.readOnly,
        };
    }
}
