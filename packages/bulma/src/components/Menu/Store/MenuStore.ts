import {MenuNode} from "./MenuNode";
import {MenuTrigger} from "./MenuTrigger";

export type MenuStoreEvents = "change";

export class MenuStore extends MenuTrigger<MenuStoreEvents> {
    public readonly children: MenuNode[] = [];

    private selected?: MenuNode;

    constructor(children: MenuNode[] = [], options: { select?: { key: string; value: any } } = {}) {
        super();

        for (const child of children) {
            this.add(child);
        }

        if (options.select) {
            const {key, value} = options.select;
            for (const child of this.children) {
                const node = child.find(key, value);
                if (node) {
                    node.enter();
                    break;
                }
            }
        }
    }

    public leave() {
        if (this.selected) {
            this.selected.leave();
            delete this.selected;
        }
    }

    public paths() {
        if (this.selected) {
            return this.selected.paths();
        }

        return [];
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
            group.emit("enter", group);
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
