import * as React from "react";
import {ReactElement} from "react";
import {MakeBreakpoint, XProps} from "../../interfaces";
import {IsColor} from "../../props";
import {ConfigFactory} from "../../utils";
import {NavbarContext} from "./props";

const {Provider} = NavbarContext;

export interface INavbar extends IsColor {
    shadow?: boolean;
    transparent?: boolean;
}

export interface INavbarProps extends XProps<"nav"> {
    children: ReactElement | [(ReactElement | boolean | null), (ReactElement | boolean | null)?];
}

const config = ConfigFactory.create({component: "navbar"});

export const Navbar = config.factory<MakeBreakpoint<INavbar>, INavbarProps>(({props, children}) => {
    const [state, setState] = React.useState(false);
    const toggle = React.useCallback(() => setState(!state), [state]);
    return (
        <nav {...props}
             aria-label="main navigation"
             role="navigation">
            <Provider value={{state, toggle}}>
                {children}
            </Provider>
        </nav>
    );
});