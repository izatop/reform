import * as React from "react";
import {calcClasses} from "../../helpers";
import {NavbarContext, NavbarOptions, NavbarProps} from "./props";

const {Provider} = NavbarContext;
export const Navbar: React.FunctionComponent<NavbarProps> = (props) => {
    const [state, setState] = React.useState(false);
    return (
        <div className={calcClasses(props, NavbarOptions)}
             aria-label="main navigation"
             role="navigation">
            <Provider value={{state, toggle: () => setState(!state)}}>
                {props.children}
            </Provider>
        </div>
    );
};
