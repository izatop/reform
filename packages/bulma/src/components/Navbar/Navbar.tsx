import * as React from "react";
import {ReactElement} from "react";
import {MakeProps, XProps} from "../../interfaces";
import {IsColor} from "../../props";
import {ConfigFactory} from "../../utils";
import {NavbarContext} from "./props";

const {Provider} = NavbarContext;

export interface INavbar extends IsColor {
    shadow?: boolean;
    transparent?: boolean;
    fixed?: boolean | "bottom" | "top";
    spaced?: boolean;
}

export interface INavbarProps extends XProps<"nav"> {
    children: ReactElement | [(ReactElement | boolean | null), (ReactElement | boolean | null)?];
}

const config = ConfigFactory.create({
    component: "navbar",
    resolvers: {
        spaced: "is-spaced",
        fixed: (v) => v === true ? "is-fixed-top" : `is-fixed-${v}`,
    },
});

export const Navbar = config.factory<MakeProps<INavbar>, INavbarProps>(({props, options: {fixed}, children}) => {
    const [state, setState] = React.useState(false);
    const toggle = React.useCallback(() => setState(!state), [state]);
    if (fixed) {
        const bodyClass = fixed === true || fixed === "top" ? "has-navbar-fixed-top" : "has-navbar-fixed-bottom";
        if (!document.body.classList.contains(bodyClass)) {
            document.body.classList.add(bodyClass);
        }
    }

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
