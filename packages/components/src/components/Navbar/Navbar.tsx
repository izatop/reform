import * as React from "react";
import {ReactElement} from "react";
import {Color} from "../../options";
import {MakeBreakpoint} from "../../type";
import {ElementFactory} from "../../utils";
import {NavbarContext} from "./props";

const {Provider} = NavbarContext;

export interface INavbar {
    "has-shadow"?: boolean;
    "is-color"?: Color;
    "is-transparent"?: boolean;
}

export interface INavbarProps {
    children: ReactElement | [ReactElement, ReactElement];
}

const config = ElementFactory.create({component: "navbar"});
export const Navbar = config.factory<MakeBreakpoint<INavbar>, INavbarProps>(({props, children}) => {
    const [state, setState] = React.useState(false);
    return (
        <div {...props}
             aria-label="main navigation"
             role="navigation">
            <Provider value={{state, toggle: () => setState(!state)}}>
                {children}
            </Provider>
        </div>
    );
});
