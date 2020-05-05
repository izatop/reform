import * as React from "react";
import {XProps} from "../../interfaces";
import {ConfigFactory} from "../../utils";

const config = ConfigFactory.create({component: "navbar-divider"});
export const NavbarDropdownDivider = config.factory<{}, XProps<"hr">>(({props}) => (
    <hr {...props}/>
));
