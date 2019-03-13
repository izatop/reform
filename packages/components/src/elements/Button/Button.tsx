import React from "react";
import {Helpers} from "../../helpers";
import {ITagButtonProps, MakeElementProps} from "../../interfaces";
import {ButtonOptions, IButtonThemeProps} from "./props";

export interface IButtonProps extends MakeElementProps<IButtonThemeProps, ITagButtonProps> {
    type?: "button" | "submit" | "reset";
    disabled?: boolean;
}

export const Button: React.FunctionComponent<IButtonProps> = (props) => (
    <button disabled={props.disabled}
            type={props.type}
            onClick={props.onClick}
            {...Helpers.calcProps(props, ButtonOptions)}>{props.children}</button>
);
