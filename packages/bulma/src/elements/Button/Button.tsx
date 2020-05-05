import React from "react";
import {BaseProps, MakeProps, XProps} from "../../interfaces";
import {IsColor, IsSize} from "../../props";
import {ConfigFactory} from "../../utils";

export enum ButtonState {
    Hover = "hovered",
    Focus = "focused",
    Active = "active",
    Loading = "loading",
}

export type ButtonStateType = ButtonState | "hovered" | "focused" | "active" | "loading";

export interface IButton extends IsColor, IsSize {
    state?: ButtonStateType;
    loading?: boolean;
    outlined?: boolean;
    inverted?: boolean;
    hovered?: boolean;
    focused?: boolean;
    rounded?: boolean;
    static?: boolean;
    fullwidth?: boolean;
    selected?: boolean;
}

export type ButtonProps = MakeProps<IButton & BaseProps>;
export type ButtonType = React.FC<ButtonProps & XProps<"button">>;

const config = ConfigFactory.create({
    component: "button",
    resolvers: {state: (v) => `is-${v}`},
});

export const Button: ButtonType = config.factory<ButtonProps, XProps<"button">>(({props, children}) => (
    <button {...props}>{children}</button>
), {type: "button"});
