import {assert} from "@reform/bundle";
import * as p5 from "parse5";
import {MinifyAdapter} from "./Document/MinifyAdapter";
import {PrettyAdapter} from "./Document/PrettyAdapter";
import {Element} from "./Element";
import {isElement, parseHTML} from "./functions";
import {NodeAbstract} from "./NodeAbstract";

export class Document extends NodeAbstract<p5.Document> {
    readonly #root: Element;

    constructor(contents: string) {
        super(parseHTML(contents));

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
        return p5.serialize(this.node, {treeAdapter: pretty ? PrettyAdapter : MinifyAdapter});
    }
}
