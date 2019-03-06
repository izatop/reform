import {MenuNode} from "./MenuNode";
import {MenuTrigger} from "./MenuTrigger";

export type MenuStoreEvents = "change";

export class MenuStore extends MenuTrigger<MenuStoreEvents> {
    public readonly children: MenuNode[] = [];

    private selected?: MenuNode;

    constructor(children: MenuNode[] = []) {
        super();

        for (const child of children) {
            this.add(child);
        }
    }

    public add(group: MenuNode) {
        this.children.push(group);
        group.listen(["enter", "child:enter"], (node: MenuNode) => {
            if (this.selected !== node) {
                if (this.selected && this.selected.isActive()) {
                    this.selected.leave();
                }

                this.selected = node;
                this.emit("change", node);
            }
        });

        if (group.isActive()) {
            group.emit("enter");
        }
    }

    public remove(group: MenuNode) {
        this.children.splice(
            this.children.indexOf(group),
            1,
        );

        group.destroy();
    }
}
