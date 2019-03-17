import React from "react";
import {Helpers} from "../../helpers";
import {FooterOptions, FooterProps} from "./props";

export const Footer: React.FunctionComponent<FooterProps> = (props) => {
    return <section className={Helpers.calcClasses(props, FooterOptions)}>{props.children}</section>;
};

Footer.displayName = "Footer";
