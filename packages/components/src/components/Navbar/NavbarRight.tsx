import * as React from "react";
import {Helpers} from "../../helpers";
import {NavbarOptions, NavbarProps, NavbarRightOptions, NavbarRightProps, NavbarWithChild} from "./props";

export const NavbarRight: React.FunctionComponent<NavbarRightProps> = (props) => (
    <div className={Helpers.calcClasses(props, NavbarRightOptions)}>
        {NavbarWithChild(props.children)}
    </div>
);
