import * as React from "react";
import {MakeProps, XProps} from "../../interfaces";
import {IsActive} from "../../props";
import {ConfigFactory} from "../../utils";

const config = ConfigFactory.create({component: "navbar-burger burger"});
export const NavbarBurger = config.factory<MakeProps<IsActive>, XProps<"a">>(({props}) => (
    <a role="button"
        {...props}
        aria-label="menu"
        aria-expanded="false">
        <span aria-hidden="true"/>
        <span aria-hidden="true"/>
        <span aria-hidden="true"/>
    </a>
));
