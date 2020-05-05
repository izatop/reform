import * as React from "react";
import {ReactElement} from "react";
import {IsActive} from "../../props";
import {MakeProps} from "../../type";
import {ConfigFactory} from "../../utils";

export interface INavbarTab extends IsActive {
    tab?: boolean;
}

export interface INavbarTabProps {
    children: ReactElement;
}

const config = ConfigFactory.create({displayName: "NavbarTab"});
export const NavbarTab = config.factory<MakeProps<INavbarTab>, INavbarTabProps>(
    ({props, children}) => React.cloneElement(children, props),
    {tab: true},
);
