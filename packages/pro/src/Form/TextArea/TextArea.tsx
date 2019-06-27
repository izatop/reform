import {TextArea as TextAreaComponent} from "@reform/components";
import * as React from "react";
import {AbstractControl} from "../AbstractControl";

export interface ITextArea {
    readOnly?: boolean;
    disabled?: boolean;
    placeholder?: string;
    rows?: number;
}

export class TextArea<P = {}> extends AbstractControl<string | number, P & ITextArea> {
    public render() {
        return (
            <TextAreaComponent onChange={this.onChange}
                               {...this.getControlProps()}/>
        );
    }

    protected getControlProps() {
        return {
            ...super.getControlProps(),
            value: this.value,
            placeholder: this.props.placeholder,
            disabled: this.props.disabled,
            readOnly: this.props.readOnly,
            rows: this.props.rows,
        };
    }

    private onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        this.update(e.currentTarget.value);
    }
}
