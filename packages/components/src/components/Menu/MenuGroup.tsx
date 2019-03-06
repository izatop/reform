import * as React from "react";
import {calcClasses} from "../../helpers";
import {MenuChildren} from "./MenuChildren";
import {MenuChildrenOptions, MenuGroupOptions, MenuGroupProps} from "./props";

export const MenuGroup: React.FunctionComponent<MenuGroupProps> = (props) => (
    <>
        <p className={calcClasses(props, MenuGroupOptions)}>
            {props.node.node}
        </p>
        <MenuChildren className={calcClasses(props, MenuChildrenOptions)}>
            {props.node.children}
        </MenuChildren>
    </>
);
