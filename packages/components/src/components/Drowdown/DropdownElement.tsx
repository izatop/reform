import * as React from "react";
import {Helpers} from "../../helpers";
import {DropdownElementOptions, DropdownElementProps} from "./props";

export const DropdownElement: React.FunctionComponent<DropdownElementProps> = (props) => {
    return React.cloneElement(
        props.children,
        {
            ...props.children.props,
            className: Helpers.calcClasses(props, DropdownElementOptions),
        },
    );
};

DropdownElement.displayName = "DropdownElement";
