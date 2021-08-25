import * as React from "react";

interface IDropdownButtonProps {
    button: React.ReactNode;
    active?: boolean;
    icon?: {
        up?: string;
        down?: string;
    };
}

export const DropdownButtonDecorator: React.FC<IDropdownButtonProps> = ({button, active, icon}) => {
    const iconUp = icon?.up ?? "angle-up";
    const iconDown = icon?.down ?? "angle-down";
    if (React.isValidElement<{children: any}>(button)) {
        const props = {
            ...button.props,
            "aria-haspopup": "true",
            "aria-controls": "dropdown-menu",
        };

        return React.cloneElement(
            button, props, <>
                <span>{props.children}</span>
                <span className="icon">
                    <i className={`fas fa-${active ? iconUp : iconDown}`}
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
                <i className={`fas fa-${active ? iconUp : iconDown}`}
                    aria-hidden={"true"}/>
            </span>
        </button>
    );
};
