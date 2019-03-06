import {ReactNode} from "react";
import {MenuTrigger} from "./MenuTrigger";

let increment = 0;

export class MenuNode extends MenuTrigger {
    public readonly id = ++increment;

    public readonly children: MenuNode[] = [];

    private selected = false;

    constructor(public readonly node: ReactNode,
                defaults: { children?: MenuNode[], selected?: boolean } = {}) {
        super();

        for (const child of defaults.children || []) {
            this.add(child);
        }

        this.selected = defaults.selected || false;
    }

    public isActive() {
        return this.selected;
    }

    public select(value: boolean) {
        if (value === this.selected) {
            return ;
        }

        this.selected = value;
        this.emit(value ? "enter" : "leave", this);
    }

    public enter() {
        this.select(true);
    }

    public leave() {
        this.select(false);
    }

    public add(node: MenuNode) {
        this.children.push(node);
        this.emit("add", this);

        node.listen(["enter", "child:enter"], (child) => this.emit("child:enter", child));

        if (node.isActive()) {
            node.emit("enter");
        }
    }

    public remove(node: MenuNode) {
        this.children.splice(
            this.children.indexOf(node),
            1,
        );
    }

    public destroy() {
        for (const child of this.children) {
            child.destroy();
        }

        this.children.splice(0, this.children.length);

        this.emit("destroy", this);
        super.destroy();
    }
}
