import * as React from "react";
import {ReactElement} from "react";
import {MakeProps} from "../../type";
import {ElementFactory} from "../../utils";
import {NavbarWithChild} from "./props";

export interface INavbarLeftProps {
    children: ReactElement[] | ReactElement;
}

const config = ElementFactory.create({component: "navbar-start"});
export const NavbarLeft = config.factory<MakeProps, INavbarLeftProps>(({props, children}) => (
    <div {...props}>
        {NavbarWithChild(children)}
    </div>
));
