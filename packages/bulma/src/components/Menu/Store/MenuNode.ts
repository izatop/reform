import {isValidElement, ReactChild, ReactFragment} from "react";
import {MenuTrigger} from "./MenuTrigger";

let increment = 0;

export interface IMenuNodeDefaults {
    children?: MenuNode[];
    selected?: boolean;
}

export class MenuNode extends MenuTrigger {
    public readonly id = ++increment;

    public readonly children: MenuNode[] = [];

    public readonly parent?: MenuNode;

    public readonly node: ReactChild | ReactFragment;

    private selected = false;

    constructor(node: ReactChild | ReactFragment,
                defaults: IMenuNodeDefaults = {}) {
        super();

        this.node = node;
        if (defaults.selected) {
            this.selected = true;
        }

        for (const child of defaults.children || []) {
            this.add(child);
        }
    }

    public find(key: string, value: any): MenuNode | undefined {
        if (isValidElement(this.node) && Reflect.get(this.node.props, key) === value) {
            return this;
        }

        for (const child of this.children) {
            const node = child.find(key, value);
            if (node) {
                return node;
            }
        }
    }

    public isActive() {
        return this.selected;
    }

    public select(value: boolean) {
        if (value === this.selected) {
            return;
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
            requestAnimationFrame(() => node.emit("enter", node));
        }

        Reflect.set(node, "parent", this);
    }

    public paths(): MenuNode[] {
        if (this.parent) {
            return [...this.parent.paths(), this];
        }

        return [this];
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
