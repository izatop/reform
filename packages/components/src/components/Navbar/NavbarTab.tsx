import * as React from "react";
import {ReactElement} from "react";
import {MakeProps} from "../../type";
import {ElementFactory} from "../../utils";

export interface INavbarTab {
    "is-tab"?: true;
    "is-active"?: boolean;
}

export interface INavbarTabProps {
    children: ReactElement;
}

const config = ElementFactory.create({displayName: "NavbarTab"});

export const NavbarTab = config.factory<MakeProps<INavbarTab>, INavbarTabProps>(
    ({props, children}) => React.cloneElement(children, props),
    {"is-tab": true},
);
