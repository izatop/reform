import * as React from "react";
import {Color, Size} from "../../../enum";
import {Helpers} from "../../../helpers";

export enum TextAreaState {
    Hover = "hovered",
    Focus = "focused",
    Load = "loading",
}

export type TextAreaProps = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLTextAreaElement>,
    HTMLTextAreaElement>;

export interface ITextAreaProps {
    props?: TextAreaProps;
    size?: Size;
    color?: Color;
    state?: TextAreaState;
    placeholder?: string;
    rows?: number;
    fixed?: boolean;
    disabled?: boolean;
    readOnly?: boolean;
}

const TextAreaOptions = {
    name: "textarea",
    is: ["size", "color", "style"],
    has: [{fixed: () => "fixed-size"}],
};

export const TextArea: React.FC<ITextAreaProps> = (props) => (
    <textarea disabled={props.disabled}
              readOnly={props.readOnly}
              rows={props.rows}
              placeholder={props.placeholder}
              {...Helpers.calcProps(props, TextAreaOptions)}>
        {props.children}
    </textarea>
);
