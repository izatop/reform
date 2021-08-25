import * as React from "react";
import {MakeProps} from "../../interfaces";
import {ConfigFactory} from "../../utils";
import {MenuChildren} from "./MenuChildren";
import {MenuNode} from "./Store/MenuNode";

const renderLabel = (node: React.ReactNode, onClick: () => void) => {
    if (React.isValidElement<{onClick:() => void}>(node)) {
        return React.cloneElement(node, {...node.props, onClick});
    }

    return node;
};

interface IMenuGroup {
    node: MenuNode;
}

const config = ConfigFactory.create({component: "menu-label"});
export const MenuGroup = config.factory<MakeProps, IMenuGroup>(({props}) => {
    const {node, ...p} = props;
    return (
        <>
            <p {...p}>{renderLabel(node.node, () => node.enter())}</p>
            <MenuChildren>
                {node.children}
            </MenuChildren>
        </>
    );
});
