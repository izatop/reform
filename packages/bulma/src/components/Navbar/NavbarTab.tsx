import { cloneElement, ReactElement } from "react";
import {MakeProps} from "../../interfaces";
import {IsActive} from "../../props";
import {ConfigFactory} from "../../utils";

export interface INavbarTab extends IsActive {
    tab?: boolean;
}

export interface INavbarTabProps {
    children: ReactElement;
}

const config = ConfigFactory.create({displayName: "NavbarTab"});
export const NavbarTab = config.factory<MakeProps<INavbarTab>, INavbarTabProps>(
    ({props, children}) => cloneElement(children, props), {tab: true},
);
