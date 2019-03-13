import * as React from "react";
import {Helpers} from "../../helpers";
import {MenuChildren} from "./MenuChildren";
import {MenuChildrenOptions, MenuGroupOptions, MenuGroupProps} from "./props";

export const MenuGroup: React.FunctionComponent<MenuGroupProps> = (props) => (
    <>
        <p className={Helpers.calcClasses(props, MenuGroupOptions)}>
            {props.node.node}
        </p>
        <MenuChildren className={Helpers.calcClasses(props, MenuChildrenOptions)}>
            {props.node.children}
        </MenuChildren>
    </>
);
