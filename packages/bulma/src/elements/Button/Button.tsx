import React from "react";
import {XProps} from "../../interfaces";
import {ColorType, SizeType} from "../../options";
import {IsColor, IsSize} from "../../props";
import {MakeProps} from "../../type";
import {ElementFactory} from "../../utils";

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
    rounded?: boolean;
    static?: boolean;
    fullwidth?: boolean;
    selected?: boolean;
}

const config = ElementFactory.create({
    component: "button",
    resolvers: {isState: (v) => `is-${v}`},
});

export const Button = config.factory<MakeProps<IButton>, XProps<"button">>(({props, children}) => (
    <button {...props}>{children}</button>
), {type: "button"});
