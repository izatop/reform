import {useMemo, ReactElement} from "react";
import {useDropdownState} from "../../functions";
import {MakeProps, XProps} from "../../interfaces";
import {ConfigFactory, Listener} from "../../utils";
import {DropdownButtonDecorator} from "./DropdownButtonDecorator";

export interface IDropdownOptions {
    arrowless?: boolean;
    hoverable?: boolean;
    right?: boolean;
    up?: boolean;
}

export interface IDropdown {
    active?: boolean;
    defaultActive?: boolean;
    closeOnLeave?: boolean;
    closeOnLeaveTimeout?: number;
    button: string | ReactElement;
    listener?: Listener<[boolean]>;
    icon?: {
        up?: string;
        down?: string;
    };
}

export type DropdownProps = XProps<"div"> & IDropdown;

const config = ConfigFactory.create({component: "dropdown"});
export const Dropdown = config.factory<MakeProps<IDropdownOptions>, DropdownProps>(({props, children, options}) => {
    const {active, defaultActive, listener, closeOnLeave, closeOnLeaveTimeout, icon, button, ...p} = props;
    const dispatcher = useDropdownState({
        active,
        defaultActive,
        closeOnLeaveTimeout,
        closeOnLeave,
        listener,
    });

    const className = useMemo(
        () => ConfigFactory.resolveClassName(
            {...options, active: dispatcher.state}, config.config,
        ), [dispatcher],
    );

    return (
        <div {...p} className={className}
            onMouseLeave={dispatcher.leave}
            onMouseEnter={dispatcher.enter}
            onClick={dispatcher.clickOut}>
            <div className="dropdown-trigger" onClick={dispatcher.click}>
                <DropdownButtonDecorator icon={icon} button={button} active={dispatcher.state}/>
            </div>
            <div className="dropdown-menu" role="menu">
                <div className="dropdown-content">
                    {children}
                </div>
            </div>
        </div>
    );
});
