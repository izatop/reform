import * as React from "react";
import {Helpers} from "../../helpers";
import {NavbarTabOptions, NavbarTabProps} from "./props";

export const NavbarDivider: React.FC<NavbarTabProps> = (props) => (
    <hr className={"navbar-divider"}/>
);

NavbarDivider.displayName = "NavbarDivider";
