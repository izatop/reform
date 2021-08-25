import * as React from "react";
import {MakeProps} from "../../interfaces";
import {ConfigFactory} from "../../utils";
import {MenuChild} from "./MenuChild";
import {MenuNode} from "./Store/MenuNode";

const config = ConfigFactory.create({component: "menu-list"});
export const MenuChildren = config.factory<MakeProps, {children: MenuNode[]}>(({props, children}) => (
    <ul {...props}>
        {children.map((node) => (
            <li key={node.id}>
                <MenuChild node={node}/>
                {node.children.length > 0 && <MenuChildren>{node.children}</MenuChildren>}
            </li>
        ))}
    </ul>
));
