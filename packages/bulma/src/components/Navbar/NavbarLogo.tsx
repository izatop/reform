import * as React from "react";
import {ReactNode} from "react";
import {MakeProps} from "../../interfaces";
import {ConfigFactory} from "../../utils";
import {NavbarBurger} from "./NavbarBurger";
import {NavbarContext, NavbarWithChild} from "./props";

const config = ConfigFactory.create({component: "navbar-brand"});
export const NavbarLogo = config.factory<MakeProps, { children: ReactNode }>(({props, children}) => (
    <div {...props}>
        {NavbarWithChild(children)}

        <NavbarContext.Consumer>
            {({state, toggle}) => (
                <NavbarBurger onClick={toggle} active={state}/>
            )}
        </NavbarContext.Consumer>
    </div>
));
