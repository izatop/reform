import * as React from "react";
import {Color} from "../../enum";

export enum ButtonSize {
    Small = "small",
    Normal = "normal",
    Medium = "meduim",
    Large = "large",
}

export enum ButtonState {
    Normal = "normal",
    Hover = "hover",
    Focus = "focus",
    Active = "active",
    Loading = "loading",
}

export enum ButtonStyle {
    Outline = "outlined",
    Invert = "inverted",
    Round = "rounded",
    Static = "static",
}

export const ButtonOptions = {
    name: "button",
    is: ["color", "style", "state", "size", "fullwidth", {style: (v: ButtonStyle | ButtonStyle[]) => v}],
};

export interface IButtonThemeProps {
    color?: Color;
    size?: ButtonSize;
    state?: ButtonState;
    style?: ButtonStyle | ButtonStyle[];
    fullwidth?: boolean;
    selected?: boolean;
    children?: React.ReactNode;
    onClick?: () => void;
}
