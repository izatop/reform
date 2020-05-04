import * as React from "react";
import {XProps} from "../../interfaces";
import {ColorType, SizeType} from "../../options";
import {MakeProps} from "../../type";
import {ElementFactory} from "../../utils";

export enum TextAreaState {
    Hover = "hovered",
    Focus = "focused",
    Load = "loading",
}

export type TextAreaStateType = TextAreaState | "hovered" | "focused" | "loading";

export interface ITextArea {
    "is-size"?: SizeType;
    "is-color"?: ColorType;
    "is-state"?: TextAreaStateType;
    "is-fixed-size"?: boolean;
    "is-loading"?: boolean;
}

const config = ElementFactory.create({component: "textarea"});

export const TextArea = config.factory<MakeProps<ITextArea>, XProps<"textarea">>(({props, children}) => (
    <textarea {...props}>{children}</textarea>
));
