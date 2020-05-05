import * as React from "react";
import {XProps} from "../../interfaces";
import {MakeProps} from "../../type";
import {ElementFactory} from "../../utils";

export interface INavbarLink {
    arrowless?: boolean;
}

export type NavbarLinkProps = XProps<"a">;

const config = ElementFactory.create({displayName: "NavbarLink"});
export const NavbarLink = config.factory<MakeProps<INavbarLink>, NavbarLinkProps>(({props, children}) => (
    <a {...props}>{children}</a>
));
