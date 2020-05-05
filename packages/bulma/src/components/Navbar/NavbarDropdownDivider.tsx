import * as React from "react";
import {XProps} from "../../interfaces";
import {ElementFactory} from "../../utils";

const config = ElementFactory.create({component: "navbar-divider"});
export const NavbarDropdownDivider = config.factory<{}, XProps<"hr">>(({props}) => (
    <hr {...props}/>
));
