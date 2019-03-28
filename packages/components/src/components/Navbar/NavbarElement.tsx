import * as React from "react";
import {MakeProps} from "../../type";
import {ElementFactory} from "../../utils";

interface INavbarElement {
    "has-dropdown"?: boolean;
    "is-active"?: boolean;
    "is-tab"?: boolean;
}

const config = ElementFactory.create({component: "navbar-item"});
export const NavbarElement = config.factory<MakeProps<INavbarElement>>(({props, children}) => (
    <div {...props}>{children}</div>
));
