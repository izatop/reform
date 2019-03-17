import * as React from "react";
import {Helpers} from "../../helpers";
import {MenuChild} from "./MenuChild";
import {MenuChildrenProps} from "./props";

export const MenuChildren: React.FunctionComponent<MenuChildrenProps> = (props) => {
    return (
        <ul className={Helpers.calcClasses(props)}>
            {props.children.map((node) => (
                <li key={node.id}>
                    <MenuChild node={node}/>
                    {node.children.length > 0 && <MenuChildren>{node.children}</MenuChildren>}
                </li>
            ))}
        </ul>
    );
};

MenuChildren.displayName = "MenuChildren";
