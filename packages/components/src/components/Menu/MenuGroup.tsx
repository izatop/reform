import * as React from "react";
import {Helpers} from "../../helpers";
import {MenuChildren} from "./MenuChildren";
import {MenuChildrenOptions, MenuGroupOptions, MenuGroupProps} from "./props";

const renderLabel = (node: React.ReactNode, onClick: () => void) => {
    if (React.isValidElement<{onClick: () => void}>(node)) {
        return React.cloneElement(node, {...node.props, onClick});
    }

    return node;
};

export const MenuGroup: React.FunctionComponent<MenuGroupProps> = (props) => (
    <>
        <p className={Helpers.calcClasses(props, MenuGroupOptions)}>
            {renderLabel(props.node.node, () => props.node.enter())}
        </p>
        <MenuChildren className={Helpers.calcClasses(props, MenuChildrenOptions)}>
            {props.node.children}
        </MenuChildren>
    </>
);

MenuGroup.displayName = "MenuGroup";
