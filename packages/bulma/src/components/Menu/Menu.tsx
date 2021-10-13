import {MakeProps, XProps} from "../../interfaces";
import {ConfigFactory} from "../../utils";
import {MenuGroup} from "./MenuGroup";
import {MenuStore} from "./Store/MenuStore";

export interface IMenu {
    store: MenuStore;
}

const config = ConfigFactory.create({
    component: "menu",
    dependencies: ["store"],
});

export const Menu = config.factory<MakeProps, IMenu & XProps<"aside">>(({props}) => {
    const {store, ...p} = props;
    return (
        <aside {...p}>
            {store.children.map((node) => <MenuGroup key={node.id} node={node}/>)}
        </aside>
    );
});
