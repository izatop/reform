import * as React from "react";
import {Helpers} from "../../helpers";
import {NavbarRightOptions, NavbarRightProps, NavbarWithChild} from "./props";

export const NavbarRight: React.FunctionComponent<NavbarRightProps> = (props) => (
    <div className={Helpers.calcClasses(props, NavbarRightOptions)}>
        {NavbarWithChild(props.children)}
    </div>
);

NavbarRight.displayName = "NavbarRight";
