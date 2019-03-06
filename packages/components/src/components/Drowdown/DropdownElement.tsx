import * as React from "react";
import {calcClasses} from "../../helpers";
import {DropdownElementOptions, DropdownElementProps} from "./props";

export const DropdownElement: React.FunctionComponent<DropdownElementProps> = (props) => {
    return React.cloneElement(
        props.children,
        {
            ...props.children.props,
            className: calcClasses(props, DropdownElementOptions),
        },
    );
};
