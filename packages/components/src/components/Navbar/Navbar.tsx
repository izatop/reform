import * as React from "react";
import {Helpers} from "../../helpers";
import {NavbarContext, NavbarOptions, NavbarProps} from "./props";

const {Provider} = NavbarContext;
export const Navbar: React.FunctionComponent<NavbarProps> = (props) => {
    const [state, setState] = React.useState(false);
    return (
        <div className={Helpers.calcClasses(props, NavbarOptions)}
             aria-label="main navigation"
             role="navigation">
            <Provider value={{state, toggle: () => setState(!state)}}>
                {props.children}
            </Provider>
        </div>
    );
};
