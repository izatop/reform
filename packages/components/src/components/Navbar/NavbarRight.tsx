import * as React from "react";
import {calcClasses} from "../../helpers";
import {NavbarOptions, NavbarProps, NavbarRightOptions, NavbarRightProps, NavbarWithChild} from "./props";

export const NavbarRight: React.FunctionComponent<NavbarRightProps> = (props) => (
    <div className={calcClasses(props, NavbarRightOptions)}>
        {NavbarWithChild(props.children)}
    </div>
);
