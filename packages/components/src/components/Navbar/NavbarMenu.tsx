import * as React from "react";
import {Helpers} from "../../helpers";
import {NavbarContext, NavbarMenuOptions, NavbarMenuProps} from "./props";

const {Consumer} = NavbarContext;
export const NavbarMenu: React.FunctionComponent<NavbarMenuProps> = (props) => (
    <Consumer>
        {({state}) => (
            <div className={Helpers.calcClasses({...props, active: state}, NavbarMenuOptions)}
                 aria-label="main navigation"
                 role="navigation">
                {props.children}
            </div>
        )}
    </Consumer>
);

NavbarMenu.displayName = "NavbarMenu";
