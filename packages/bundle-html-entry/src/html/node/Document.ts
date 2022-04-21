import {assert} from "@reform/bundle";
import {serialize} from "parse5";
import {MinifyAdapter} from "./Document/MinifyAdapter";
import {PrettyAdapter} from "./Document/PrettyAdapter";
import {Element} from "./Element";
import {isElement, parseHTML} from "./functions";
import {NodeAbstract} from "./NodeAbstract";
import {P5Pick} from "./p5";

export class Document extends NodeAbstract<P5Pick<"document">> {
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
        return serialize(this.node, {treeAdapter: pretty ? PrettyAdapter : MinifyAdapter});
    }
}
