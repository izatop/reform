import * as React from "react";
import {ReactElement} from "react";
import {MakeProps} from "../../type";
import {ElementFactory} from "../../utils";

export interface IDropdownElement {
    "is-active"?: boolean;
}

export interface IDropdownElementProps {
    children: ReactElement;
}

const config = ElementFactory.create({component: "dropdown-item"});

export const DropdownElement = config.factory<MakeProps<IDropdownElement>, IDropdownElementProps>(
    ({props, children}) => (
        React.useMemo(() => (
                React.cloneElement(
                    children,
                    {
                        ...children.props,
                        ...props,
                    },
                )
            ),
            [props.className],
        )
    ),
);
