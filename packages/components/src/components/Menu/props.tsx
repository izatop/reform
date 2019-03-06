import {MakeProps} from "../../interfaces";
import {MenuNode} from "./Store/MenuNode";
import {MenuStore} from "./Store/MenuStore";

export const MenuOptions = {
    name: "menu",
};

export type MenuProps = MakeProps<{
    store: MenuStore;
    collapse?: boolean;
}>;

export const MenuGroupOptions = {
    name: "menu-label",
};

export type MenuGroupProps = MakeProps<{
    node: MenuNode;
}>;

export const MenuChildrenOptions = {
    name: "menu-list",
};

export type MenuChildrenProps = MakeProps<{
    children: MenuNode[];
}>;
