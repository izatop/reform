import {P5Pick} from "./p5";

export abstract class NodeAbstract<T extends P5Pick<"parentNode">> {
    readonly #node: T;

    constructor(node: T) {
        this.#node = node;
    }

    public get node() {
        return this.#node;
    }
}
