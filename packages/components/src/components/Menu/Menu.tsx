import * as React from "react";
import {calcClasses} from "../../helpers";
import {MenuGroup} from "./MenuGroup";
import {MenuOptions, MenuProps} from "./props";

export const Menu: React.FunctionComponent<MenuProps> = (props) => (
    <aside className={calcClasses(props, MenuOptions)}>
        {props.store.children.map((node) => <MenuGroup key={node.id} node={node}/>)}
    </aside>
);
