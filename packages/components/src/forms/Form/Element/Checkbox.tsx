import * as React from "react";
import {Helpers} from "../../../helpers";

export type CheckboxProps = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement>;

export interface ICheckboxProps {
    props?: CheckboxProps;
    disabled?: boolean;
}

export const Checkbox: React.FC<ICheckboxProps> = (props) => (
    <label {...Helpers.calcProps(
        {props: {disabled: props.disabled}},
        {name: "checkbox"},
        )}>
        <input type={"checkbox"}
               disabled={props.disabled}
               {...Helpers.calcProps(props, {name: "checkbox"})} />
        &nbsp;{props.children}
    </label>
);
