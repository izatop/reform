import * as React from "react";
import {XProps} from "../../interfaces";
import {MakeProps} from "../../type";
import {ElementFactory} from "../../utils";
import {MenuGroup} from "./MenuGroup";
import {MenuStore} from "./Store/MenuStore";

export interface IMenu {
    store: MenuStore;
}

const config = ElementFactory.create({
    component: "menu",
    dependencies: ["store"],
});

export const Menu = config.factory<MakeProps, IMenu & XProps<"aside">>(({props, options}) => {
    console.log(props, options);
    const {store, ...p} = props;
    return (
        <aside {...p}>
            {store.children.map((node) => <MenuGroup key={node.id} node={node}/>)}
        </aside>
    );
});
