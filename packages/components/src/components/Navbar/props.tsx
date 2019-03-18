import {Children, cloneElement, createContext, createElement, isValidElement, ReactElement, ReactNode} from "react";
import {Helpers} from "../../helpers";
import {Color} from "../../enum";
import {MakeBreakpointProps, MakeProps} from "../../interfaces";

export interface INavbarContext {
    state: boolean;
    toggle: () => void;
}

export const NavbarContext = createContext<INavbarContext>({} as INavbarContext);

export const NavbarOptions = {
    name: "navbar",
    has: ["shadow"],
    is: ["color", "transparent"],
};
export type NavbarProps = MakeBreakpointProps<{
    children: ReactElement | [ReactElement, ReactElement];
    shadow?: boolean;
    color?: Color;
    transparent?: boolean;
}>;

export const NavbarLogoOptions = {name: "navbar-brand"};
export type NavbarLogoProps = MakeProps<{ children: ReactNode }>;

export const NavbarMenuOptions = {name: "navbar-menu", is: ["active"]};
export type NavbarMenuProps = MakeProps<{ children: ReactElement | [ReactElement, ReactElement] }>;

export const NavbarLeftOptions = {name: "navbar-start"};
export type NavbarLeftProps = MakeProps<{ children: ReactElement[] | ReactElement }>;

export const NavbarRightOptions = {name: "navbar-end"};
export type NavbarRightProps = MakeProps<{ children: ReactElement[] | ReactElement }>;

export const NavbarItemOptions = {name: "navbar-item"};

export const NavbarDropdownOptions = {
    is: ["hoverable", "active", "right"],
    has: ["dropdown"],
};

export type NavbarDropdownProps = MakeProps<{
    hoverable?: boolean;
    defaultActive?: boolean;
    mouseLeaveTimeout?: number;
    children: [ReactElement, ...ReactElement[]];
    right?: boolean;
}>;

export type NavbarTabProps = MakeProps<{
    active?: boolean;
    children: ReactElement
}>;

export const NavbarTabOptions = {name: "is-tab", is: ["active"]};

export const NavbarWithChild = (children: ReactElement | {} | ReactNode): ReactNode => {
    return Children.map(children, (child) => {

        if (isValidElement(child)) {
            return cloneElement(child, Helpers.calcProps(child.props, NavbarItemOptions));
        }

        return createElement("span", Helpers.calcProps({}, NavbarItemOptions), child);
    });
};

export const NavbarDropdownWithChild = (children: ReactElement | {} | ReactNode): ReactNode => {
    return Children.map(children, (child) => {
        if (isValidElement(child) && child.type === "hr") {
            return cloneElement(child, Helpers.calcProps(child.props, {name: "navbar-divider"}));
        }

        if (isValidElement(child)) {
            return cloneElement(child, Helpers.calcProps(child.props, NavbarItemOptions));
        }

        return createElement("span", Helpers.calcProps({}, NavbarItemOptions), [child]);
    });
};
