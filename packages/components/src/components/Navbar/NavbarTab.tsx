import * as React from "react";
import {calcProps} from "../../helpers";
import {NavbarTabOptions, NavbarTabProps} from "./props";

export const NavbarTab: React.FC<NavbarTabProps> = (props) => (
    React.cloneElement(props.children, calcProps(props, NavbarTabOptions))
);
