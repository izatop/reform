import React from "react";
import {calcClasses} from "../../helpers";
import {FooterOptions, FooterProps} from "./props";

export const Footer: React.FunctionComponent<FooterProps> = (props) => {
    return <section className={calcClasses(props, FooterOptions)}>{props.children}</section>;
};
