import * as React from "react";
import {Helpers} from "../../helpers";
import {NavbarLeftOptions, NavbarLeftProps, NavbarWithChild} from "./props";

export const NavbarLeft: React.FunctionComponent<NavbarLeftProps> = (props) => (
    <div className={Helpers.calcClasses(props, NavbarLeftOptions)}>
        {NavbarWithChild(props.children)}
    </div>
);

NavbarLeft.displayName = "NavbarLeft";
