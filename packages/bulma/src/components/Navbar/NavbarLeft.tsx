import * as React from "react";
import {ReactNode, ReactNodeArray} from "react";
import {MakeProps} from "../../type";
import {ElementFactory} from "../../utils";
import {NavbarWithChild} from "./props";

export interface INavbarLeftProps {
    children: ReactNode | ReactNodeArray;
}

const config = ElementFactory.create({component: "navbar-start"});
export const NavbarLeft = config.factory<MakeProps, INavbarLeftProps>(({props, children}) => (
    <div {...props}>
        {NavbarWithChild(children)}
    </div>
));
