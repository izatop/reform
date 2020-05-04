import * as React from "react";
import {XProps} from "../../interfaces";
import {ColorType, SizeType} from "../../options";
import {MakeProps} from "../../type";
import {ElementFactory} from "../../utils";

export enum InputState {
    Hover = "hovered",
    Focus = "focused",
    Load = "loading",
}

export type InputStateType = InputState | "hovered" | "focused" | "loading";

interface IInput {
    "is-size"?: SizeType;
    "is-color"?: ColorType;
    "is-state"?: InputStateType;
    "is-rounded"?: boolean;
    "is-static"?: boolean;
    "is-loading"?: boolean;
}

const config = ElementFactory.create({component: "input"});

export const Input = config.factory<MakeProps<IInput>, XProps<"input">>(({props}) => (
    <input {...props}/>
));
