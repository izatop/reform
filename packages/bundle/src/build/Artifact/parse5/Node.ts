import * as parse5 from "parse5";
import {assert} from "../../../internal";

export class Node {
    readonly #node: parse5.Element;

    constructor(node: parse5.Element) {
        this.#node = node;
    }

    public get tag() {
        return this.#node.tagName;
    }

    public get childNodes() {
        return this.#node.childNodes;
    }

    public get(name: string) {
        return this.getAttribute(name)?.value;
    }

    public getAttribute(name: string) {
        return this.#node.attrs.find((item) => item.name === name);
    }

    public set(name: string, value: string): void {
        const attribute = this.getAttribute(name);
        if (!attribute) {
            this.#node.attrs.push({name, value});
            return;
        }

        attribute.name = name;
        attribute.value = value;
    }

    public sure(name: string) {
        const value = this.get(name);
        assert(!!value, `Unknown key ${name}`);
        return value;
    }

    public has(name: string) {
        return this.get(name) !== undefined;
    }

    public test(name: string, test: string | RegExp) {
        const value = this.get(name) ?? "";
        return typeof test === "string"
            ? value === test
            : test.test(value);
    }
}
