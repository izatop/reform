import * as React from "react";
import {Helpers} from "../../../helpers";

export type RadioProps = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement>;

export interface IRadioProps {
    props?: RadioProps;
    disabled?: boolean;
}

export const Radio: React.FC<IRadioProps> = (props) => (
    <label {...Helpers.calcProps(
        {props: {disabled: props.disabled}},
        {name: "radio"},
    )}>
        <input type={"radio"}
               disabled={props.disabled}
               {...Helpers.calcProps(props, {name: "radio"})} />
        &nbsp;{props.children}
    </label>
);
