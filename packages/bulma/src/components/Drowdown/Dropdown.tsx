import * as React from "react";
import {ReactElement} from "react";
import {XProps} from "../../interfaces";
import {MakeProps} from "../../type";
import {ConfigFactory} from "../../utils";

export interface IDropdownOptions {
    arrowless?: boolean;
    hoverable?: boolean;
    right?: boolean;
    up?: boolean;
}

export interface IDropdown {
    active?: boolean;
    defaultActive?: boolean;
    mouseLeaveTimeout?: number;
    button: string | ReactElement;
}

export type DropdownProps = XProps<"div"> & IDropdown;

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

const config = ConfigFactory.create({component: "dropdown"});

export const Dropdown = config.factory<MakeProps<IDropdownOptions>, DropdownProps>(({props, children, options}) => {
    const {active: controlledActive, defaultActive, mouseLeaveTimeout, button, ...p} = props;
    const [autoActive, setActive] = React.useState(defaultActive || false);

    const trigger: any = {};
    const controlled = typeof controlledActive === "boolean";
    const active = controlled ? controlledActive : autoActive;

    if (!controlled && !options.hoverable) {
        let timer: number;

        trigger.onClick = React.useCallback(
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

    p.className = React.useMemo(() => ConfigFactory.resolveClassName(
        {...options, active},
        config.config,
    ), [active, controlled]);

    return (
        <div {...p}>
            <div {...trigger} className="dropdown-trigger">
                {renderButton(button, active)}
            </div>
            <div className="dropdown-menu" role="menu">
                <div className="dropdown-content">
                    {children}
                </div>
            </div>
        </div>
    );
});
