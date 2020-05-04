import React from "react";
import {XProps} from "../../interfaces";
import {ColorType, SizeType} from "../../options";
import {MakeProps} from "../../type";
import {ElementFactory} from "../../utils";

export enum ButtonState {
    Normal = "normal",
    Hover = "hover",
    Focus = "focus",
    Active = "active",
    Loading = "loading",
}

export type ButtonStateType = ButtonState | "normal" | "hover" | "focus" | "active" | "loading";

export interface IButton {
    "is-color"?: ColorType;
    "is-size"?: SizeType;
    "is-state"?: ButtonStateType;
    "is-loading"?: boolean;
    "is-outlined"?: boolean;
    "is-inverted"?: boolean;
    "is-rounded"?: boolean;
    "is-static"?: boolean;
    "is-fullwidth"?: boolean;
    "is-selected"?: boolean;
}

const config = ElementFactory.create({component: "button"});

export const Button = config.factory<MakeProps<IButton>, XProps<"button">>(({props, children}) => (
    <button {...props}>{children}</button>
), {type: "button"});
