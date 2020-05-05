import * as React from "react";
import {ReactElement} from "react";
import {MakeProps} from "../../type";
import {ClassNameResolver, ElementFactory} from "../../utils";
import {NavbarContext} from "./props";

export interface INavbarMenu {
    children: ReactElement | [(ReactElement | boolean | null), (ReactElement | boolean | null)?];
}

const config = ElementFactory.create({component: "navbar-menu"});
const getClassName = (options: any, isActive?: boolean) => {
    return ClassNameResolver.resolveClassName({...options, active: isActive}, config.config);
};

export const NavbarMenu = config.factory<MakeProps, INavbarMenu>(({props, options, children}) => (
    <NavbarContext.Consumer>
        {({state}) => (
            <div {...props}
                 className={getClassName(options, state)}
                 aria-label="main navigation"
                 role="navigation">
                {children}
            </div>
        )}
    </NavbarContext.Consumer>
));
