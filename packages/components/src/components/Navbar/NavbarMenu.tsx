import * as React from "react";
import {calcClasses} from "../../helpers";
import {NavbarContext, NavbarMenuOptions, NavbarMenuProps} from "./props";

const {Consumer} = NavbarContext;
export const NavbarMenu: React.FunctionComponent<NavbarMenuProps> = (props) => (
    <Consumer>
        {({state}) => (
            <div className={calcClasses({...props, active: state}, NavbarMenuOptions)}
                 aria-label="main navigation"
                 role="navigation">
                {props.children}
            </div>
        )}
    </Consumer>
);
