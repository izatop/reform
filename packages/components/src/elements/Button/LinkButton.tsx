import React from "react";
import {Helpers} from "../../helpers";
import {ITagAnchorProps, MakeElementProps} from "../../interfaces";
import {ButtonOptions, IButtonThemeProps} from "./props";

export interface ILinkButtonProps extends MakeElementProps<IButtonThemeProps, ITagAnchorProps> {
    href?: string;
}

export const LinkButton: React.FunctionComponent<ILinkButtonProps> = (props) => (
    <a href={props.href} {...Helpers.calcProps(props, ButtonOptions)}>{props.children}</a>
);

LinkButton.displayName = "LinkButton";
