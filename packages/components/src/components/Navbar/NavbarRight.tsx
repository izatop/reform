import * as React from "react";
import {ReactElement} from "react";
import {MakeProps} from "../../type";
import {ElementFactory} from "../../utils";
import {NavbarWithChild} from "./props";

export interface INavbarRightProps {
    children: ReactElement[] | ReactElement;
}

const config = ElementFactory.create({component: "navbar-end"});
export const NavbarRight = config.factory<MakeProps, INavbarRightProps>(({props, children}) => (
    <div {...props}>
        {NavbarWithChild(children)}
    </div>
));
