import * as React from "react";
import {calcProps} from "../../helpers";
import {NavbarDropdownOptions, NavbarDropdownProps, NavbarDropdownWithChild} from "./props";

export const NavbarDropdown: React.FC<NavbarDropdownProps> = (props) => {
    const [button, ...children] = React.Children.toArray(props.children) as React.ReactElement[];
    const [active, setActive] = React.useState(props.defaultActive || false);
    const buttonProps = {...button.props, props: {} as any};
    const itemProps = {...props, props: {} as any, active, dropdown: true};

    if (!props.hoverable) {
        let timer: any;

        buttonProps.props.onClick = React.useCallback(
            () => {
                if (active) {
                    clearTimeout(timer);
                }

                setActive(!active);
            },
            [active],
        );

        itemProps.props.onMouseLeave = React.useCallback(
            () => {
                timer = setTimeout(
                    () => active && setActive(false),
                    props.mouseLeaveTimeout || 500,
                );
            },
            [active],
        );

        itemProps.props.onMouseEnter = React.useCallback(
            () => clearTimeout(timer),
            [active],
        );
    }

    return (
        <div {...calcProps(itemProps, NavbarDropdownOptions)}>
            {React.cloneElement(button, calcProps(buttonProps, {name: "navbar-link"}))}
            <div className="navbar-dropdown">
                {NavbarDropdownWithChild(children)}
            </div>
        </div>
    );
};
