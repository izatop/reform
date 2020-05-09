import * as React from "react";
import {ReactElement} from "react";
import {MakeProps} from "../../interfaces";
import {ConfigFactory} from "../../utils";

export interface IDropdownElement {
    active?: boolean;
}

export interface IDropdownElementProps {
    children: ReactElement;
}

const config = ConfigFactory.create({component: "dropdown-item"});
export const DropdownElement = config.factory<MakeProps<IDropdownElement>, IDropdownElementProps>(
    ({props, children}) => (
        React.cloneElement(
            children,
            {
                ...children.props,
                ...props,
            },
        )
    ),
);
