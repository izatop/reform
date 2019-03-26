import {Checkbox as CheckboxComponent} from "@reform/components";
import * as React from "react";
import {AbstractControl} from "../AbstractControl";

export interface ICheckbox {
    style?: React.CSSProperties;
    className?: string;
    children?: string;
}

export abstract class Checkbox<P = {}> extends AbstractControl<boolean, P & ICheckbox> {
    protected get initialValue() {
        return false;
    }

    public render() {
        return (
            <CheckboxComponent onChange={this.onChange}
                               {...this.getControlProps()}>
                {this.props.children}
            </CheckboxComponent>
        );
    }

    private onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.update(e.currentTarget.checked);
    }
}
