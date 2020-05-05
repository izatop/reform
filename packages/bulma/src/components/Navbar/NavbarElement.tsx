import * as React from "react";
import {MakeProps, XProps} from "../../interfaces";
import {IsActive} from "../../props";
import {ConfigFactory} from "../../utils";

interface INavbarElement extends IsActive {
    dropdown?: boolean;
    tab?: boolean;
}

const config = ConfigFactory.create({
    component: "navbar-item",
    resolvers: {
        dropdown: (v) => v && "has-dropdown",
        tab: (v) => v && "is-tab",
    },
});

export const NavbarElement = config.factory<MakeProps<INavbarElement>, XProps<"div">>(({props, children}) => (
    <div {...props}>{children}</div>
));
