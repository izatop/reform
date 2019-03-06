import React from "react";
import {calcProps} from "../../helpers";
import {ITagAnchorProps, MakeElementProps} from "../../interfaces";
import {ButtonOptions, IButtonThemeProps} from "./props";

export interface ILinkButtonProps extends MakeElementProps<IButtonThemeProps, ITagAnchorProps> {
    href?: string;
}

export const LinkButton: React.FunctionComponent<ILinkButtonProps> = (props) => (
    <a href={props.href} {...calcProps(props, ButtonOptions)}>{props.children}</a>
);
