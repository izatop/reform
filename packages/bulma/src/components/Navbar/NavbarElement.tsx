import * as React from "react";
import {XProps} from "../../interfaces";
import {IsActive} from "../../props";
import {MakeProps} from "../../type";
import {ElementFactory} from "../../utils";

interface INavbarElement extends IsActive {
    dropdown?: boolean;
    tab?: boolean;
}

const config = ElementFactory.create({
    component: "navbar-item",
    resolvers: {
        dropdown: (v) => v && "has-dropdown",
        tab: (v) => v && "is-tab",
    },
});

export const NavbarElement = config.factory<MakeProps<INavbarElement>, XProps<"div">>(({props, children}) => (
    <div {...props}>{children}</div>
));
