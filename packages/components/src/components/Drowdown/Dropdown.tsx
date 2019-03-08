import * as React from "react";
import {calcClasses} from "../../helpers";
import {DropdownOptions, DropdownProps} from "./props";

const renderButton = (button: React.ReactNode, active?: boolean) => {
    if (React.isValidElement<{ children: any }>(button)) {
        const props = {
            ...button.props,
            "aria-haspopup": "true",
            "aria-controls": "dropdown-menu",
        };

        return React.cloneElement(
            button,
            props,
            <>
                <span>{props.children}</span>
                <span className="icon">
                    <i className={`fas fa-angle-${active ? "up" : "down"}`}
                       aria-hidden={"true"}/>
                </span>
            </>,
        );
    }

    return (
        <button className="button"
                aria-haspopup="true"
                aria-controls="dropdown-menu">
            <span>{button}</span>
            <span className="icon is-small">
                <i className={`fas fa-angle-${active ? "up" : "down"}`}
               aria-hidden={"true"}/>
            </span>
        </button>
    );
};

export const Dropdown: React.FunctionComponent<DropdownProps> = (props) => {
    const [active, setActive] = React.useState(props.defaultActive || false);
    const dropdownProps: any = {
        className: calcClasses({active, ...props}, DropdownOptions),
    };

    const triggerProps: any = {};

    if (!props.hoverable) {
        let timer: any;

        triggerProps.onClick = React.useCallback(
            () => {
                if (active) {
                    clearTimeout(timer);
                }

                setActive(!active);
            },
            [active],
        );

        dropdownProps.onMouseLeave = React.useCallback(
            () => {
                timer = setTimeout(
                    () => active && setActive(false),
                    props.mouseLeaveTimeout || 500,
                );
            },
            [active],
        );

        dropdownProps.onMouseEnter = React.useCallback(
            () => clearTimeout(timer),
            [active],
        );
    }

    return (
        <div {...dropdownProps}>
            <div {...triggerProps} className="dropdown-trigger">
                {renderButton(props.button, active)}
            </div>
            <div className="dropdown-menu" role="menu">
                <div className="dropdown-content">
                    {props.children}
                </div>
            </div>
        </div>
    );
};
