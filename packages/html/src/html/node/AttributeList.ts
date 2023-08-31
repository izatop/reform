import {assert} from "@reform/bundle";
import {Token} from "parse5";

import {Element} from "./Element";
import {formatNS, parseNS} from "./functions";

export class AttributeList {
    readonly #node: Element;

    readonly #children: Token.Attribute[];

    readonly #index = new Map<string, Token.Attribute>();

    constructor(node: Element, children: Token.Attribute[]) {
        this.#node = node;
        this.#children = children;
        for (const child of this.#children) {
            const ns = formatNS(child.name, child.namespace);
            this.#index.set(ns, child);
        }
    }

    public get(key: string) {
        return this.#index.get(key);
    }

    public getAll() {
        return [...this.#index.values()];
    }

    public set(ns: string, value = "") {
        const {namespace, name} = parseNS(ns);
        const attribute = {name, namespace, value};

        this.#children.push(attribute);
        this.#index.set(ns, attribute);
    }

    public ensure(key: string) {
        const node = this.#index.get(key);
        assert(node, `Attribute ${key} not found`);

        return node;
    }

    public has(key: string) {
        return this.#index.has(key);
    }
}
