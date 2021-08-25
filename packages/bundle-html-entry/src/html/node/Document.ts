import {assert} from "@reform/bundle";
import * as p5 from "parse5";
import * as TreeAdapter from "parse5/lib/tree-adapters/default";
import {Element} from "./Element";
import {isElement} from "./functions";
import {NodeAbstract} from "./NodeAbstract";

export class Document extends NodeAbstract<p5.Document> {
    readonly #root: Element;

    constructor(node: p5.Document) {
        super(node);

        const [root] = this
            .node
            .childNodes
            .filter(isElement)
            .map((node) => new Element(node));

        assert(root, "Wrong document");
        this.#root = root;
    }

    public get child() {
        return this.#root;
    }

    public serialize(pretty = false) {
        const options = pretty
            ? {}
            : {
                treeAdapter: {
                    ...TreeAdapter,
                    getTextNodeContent: (textNode: p5.TextNode) => textNode.value.trim(),
                },
            };

        return p5.serialize(this.node, options);
    }
}
