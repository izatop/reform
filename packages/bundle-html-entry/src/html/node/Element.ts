import {assert} from "@reform/bundle";
import * as p5 from "parse5";
import {AttributeList} from "./AttributeList";
import {isElement, parseNS} from "./functions";
import {NodeAbstract} from "./NodeAbstract";

export class Element extends NodeAbstract<p5.Element> {
    readonly #attributes: AttributeList;
    readonly #children: Element[];
    readonly #parent?: Element;

    constructor(node: p5.Element, parent?: Element) {
        super(node);
        this.#parent = parent;
        this.#attributes = new AttributeList(this, node.attrs);
        this.#children = node.childNodes
            .filter(isElement)
            .map((node) => new Element(node, this));
    }

    public get name() {
        return this.node.tagName;
    }

    public static append(parent: Element, ns: string) {
        const {namespace, name} = parseNS(ns);
        const node = new Element(
            {
                tagName: name,
                nodeName: name,
                namespaceURI: namespace,
                parentNode: parent.node,
                childNodes: [],
                attrs: [],
            },
            parent,
        );

        parent.append(node);

        return node;
    }

    public getAttribute(key: string) {
        return this.#attributes.get(key);
    }

    public setAttribute(ns: string, value = "") {
        this.#attributes.set(ns, value);
    }

    public ensureAttribute(key: string) {
        return this.#attributes.ensure(key);
    }

    public get children() {
        return this.#children;
    }

    public query(key: string) {
        const found: Element[] = [];
        for (const child of this.#children) {
            if (child.name === key) {
                found.push(child);
            }

            found.push(...child.query(key));
        }

        return found;
    }

    public ensureFirst(key: string) {
        const [found] = this.query(key);
        assert(found, `Node ${key} not found`);

        return found;
    }

    public remove() {
        if (this.#parent) {
            this.#parent.detach(this);
        }
    }

    protected detach(node: Element) {
        const index = this.node.childNodes.indexOf(node.node);
        if (index > -1) {
            this.node.childNodes.splice(index, 1);
        }
    }

    protected append(node: Element) {
        this.node.childNodes.push(node.node);
        this.#children.push(node);
    }
}
