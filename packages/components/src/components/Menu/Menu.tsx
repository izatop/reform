import * as React from "react";
import {Helpers} from "../../helpers";
import {MenuGroup} from "./MenuGroup";
import {MenuOptions, MenuProps} from "./props";

export const Menu: React.FunctionComponent<MenuProps> = (props) => (
    <aside className={Helpers.calcClasses(props, MenuOptions)}>
        {props.store.children.map((node) => <MenuGroup key={node.id} node={node}/>)}
    </aside>
);
