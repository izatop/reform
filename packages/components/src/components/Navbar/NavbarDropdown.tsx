import * as React from "react";
import {ReactElement} from "react";
import {XProps} from "../../interfaces";
import {MakeProps} from "../../type";
import {ElementFactory} from "../../utils";
import {NavbarElement} from "./NavbarElement";
import {NavbarWithChild} from "./props";

export interface INavbarDropdown {
    "is-hoverable"?: boolean;
    "is-right"?: boolean;
}

export type NavbarDropdownProps = XProps<"div"> & {
    defaultActive?: boolean;
    mouseLeaveTimeout?: number;
    button?: string;
    children: [ReactElement, ...ReactElement[]];
};

const config = ElementFactory.create({
    displayName: "NavbarDropdown",
});

export const NavbarDropdown = config.factory<MakeProps<INavbarDropdown>, NavbarDropdownProps>(
    ({props, children, options}) => {
        const {defaultActive, mouseLeaveTimeout, ...p} = props;
        const [button, ...elements] = React.Children.toArray<React.ReactElement>(children);
        const [active, setActive] = React.useState(defaultActive || false);

        const buttonProps = {...button.props};
        if (!options["is-hoverable"]) {
            let timer: any;

            buttonProps.onClick = React.useCallback(
                () => {
                    if (active) {
                        clearTimeout(timer);
                    }

                    setActive(!active);
                },
                [active],
            );

            p.onMouseLeave = React.useCallback(
                () => {
                    timer = setTimeout(
                        () => active && setActive(false),
                        mouseLeaveTimeout || 500,
                    );
                },
                [active],
            );

            p.onMouseEnter = React.useCallback(
                () => clearTimeout(timer),
                [active],
            );
        }

        return (
            <NavbarElement is-active={active} has-dropdown={true} {...p}>
                {React.cloneElement(
                    button,
                    {...buttonProps, className: `${buttonProps.className || ""} navbar-link`},
                    buttonProps.children,
                )}
                <div className="navbar-dropdown">
                    {NavbarWithChild(elements)}
                </div>
            </NavbarElement>
        );
    },
);
