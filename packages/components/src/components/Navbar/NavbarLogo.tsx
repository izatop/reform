import * as React from "react";
import {Helpers} from "../../helpers";
import {NavbarContext, NavbarLogoOptions, NavbarLogoProps, NavbarWithChild} from "./props";

const {Consumer} = NavbarContext;
const BurgerOptions = {
    name: "navbar-burger burger",
    is: ["active"],
};

export const NavbarLogo: React.FunctionComponent<NavbarLogoProps> = (props) => (
    <div className={Helpers.calcClasses(props, NavbarLogoOptions)}>
        {NavbarWithChild(props.children)}

        <Consumer>
            {({state, toggle}) => (
                <a role="button"
                   onClick={() => toggle()}
                   className={Helpers.calcClasses({active: state}, BurgerOptions)}
                   aria-label="menu"
                   aria-expanded="false"
                   data-target="navbarBasicExample">
                    <span aria-hidden="true"/>
                    <span aria-hidden="true"/>
                    <span aria-hidden="true"/>
                </a>
            )}
        </Consumer>
    </div>
);

NavbarLogo.displayName = "NavbarLogo";
