import * as React from "react";
import {calcClasses} from "../../helpers";
import {NavbarLeftOptions, NavbarLeftProps, NavbarWithChild} from "./props";

export const NavbarLeft: React.FunctionComponent<NavbarLeftProps> = (props) => (
    <div className={calcClasses(props, NavbarLeftOptions)}>
        {NavbarWithChild(props.children)}
    </div>
);
