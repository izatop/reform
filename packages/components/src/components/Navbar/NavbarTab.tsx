import * as React from "react";
import {Helpers} from "../../helpers";
import {NavbarTabOptions, NavbarTabProps} from "./props";

export const NavbarTab: React.FC<NavbarTabProps> = (props) => (
    React.cloneElement(props.children, Helpers.calcProps(props, NavbarTabOptions))
);
