import {MakeProps, XProps} from "../../interfaces";
import {ConfigFactory} from "../../utils";

export interface INavbarLink {
    arrowless?: boolean;
}

export type NavbarLinkProps = XProps<"a">;

const config = ConfigFactory.create({displayName: "NavbarLink"});
export const NavbarLink = config.factory<MakeProps<INavbarLink>, NavbarLinkProps>(({props, children}) => (
    <a {...props}>{children}</a>
));
