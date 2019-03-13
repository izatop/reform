import * as React from "react";
import {Color, Size} from "../../../enum";
import {Helpers} from "../../../helpers";

export enum InputStyle {
    Round = "rounded",
    Static = "static",
}

export enum InputState {
    Hover = "hovered",
    Focus = "focused",
    Load = "loading",
}

export type InputProps = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement>;

export interface IInputProps {
    props?: InputProps;
    size?: Size;
    color?: Color;
    style?: InputStyle;
    state?: InputState;
    disabled?: boolean;
    readOnly?: boolean;
    placeholder?: string;
    type?: "text" | "password" | "email" | "tel" | string;
}

const InputOptions = {
    name: "input",
    is: ["size", "color", "style"],
};

export const Input: React.FC<IInputProps> = (props) => (
    <input disabled={props.disabled}
           readOnly={props.readOnly}
           placeholder={props.placeholder}
           {...Helpers.calcProps(props, InputOptions)}/>
);
