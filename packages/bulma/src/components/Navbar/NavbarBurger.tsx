import * as React from "react";
import {XProps} from "../../interfaces";
import {IsActive} from "../../props";
import {MakeProps} from "../../type";
import {ElementFactory} from "../../utils";

const config = ElementFactory.create({component: "navbar-burger burger"});
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
