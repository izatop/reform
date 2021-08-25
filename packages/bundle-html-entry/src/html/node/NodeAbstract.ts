import * as p5 from "parse5";

export abstract class NodeAbstract<T extends p5.ParentNode> {
    readonly #node: T;

    constructor(node: T) {
        this.#node = node;
    }

    public get node() {
        return this.#node;
    }
}
