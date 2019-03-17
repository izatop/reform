import {Checkbox as CheckboxComponent} from "@reform/components";
import * as React from "react";
import {AbstractControl} from "../AbstractControl";

export interface ICheckbox {
    style?: React.CSSProperties;
    className?: string;
    children?: string;
}

export abstract class Checkbox<P = {}> extends AbstractControl<boolean, P & ICheckbox> {
    protected get defaultValue() {
        return false;
    }

    public render() {
        const props = this.createProps<HTMLInputElement>({
            onChange: (e) => this.update(e.target.checked),
        });

        return (
            <CheckboxComponent {...this.getControlProps()} props={props}>
                {this.props.children}
            </CheckboxComponent>
        );
    }
}
