import {ok} from "assert";
import * as fs from "fs";
import * as parse5 from "parse5";
import {assert} from "../../internal";
import {Node} from "./parse5/Node";

export class ApplicationDocument {
    public readonly path: string;
    readonly #scripts: string[];
    readonly #html: parse5.Element;
    readonly #head: parse5.Element;
    readonly #document: parse5.Document;
    readonly #registry = new Map<string, Node>();

    constructor(path: string) {
        this.path = path;
        this.#document = this.createDocumentFrom(this.path);
        this.#html = this.findNode("html", this.#document);
        this.#head = this.findNode("head", this.#html);
        this.#scripts = this.getScripts();
    }

    public get head() {
        return this.#head;
    }

    public get document() {
        return this.#document;
    }

    public get registry() {
        return this.#registry;
    }

    public getEntryPoints() {
        return this.#scripts.map((file) => file);
    }

    public getFileList(): string[] {
        return this.resolve(
            this.#head,
            "link",
            (node) => node.test("rel", /^(icon)$/),
            (node) => node.sure("href"),
        );
    }

    public getWebManifest(): string {
        const [webManifestFile] = this.resolve(
            this.#head,
            "link",
            (node) => node.test("rel", /^(manifest)$/),
            (node) => node.sure("href"),
        );

        return webManifestFile;
    }

    public getScripts(): string[] {
        return this.resolve(
            this.#html,
            "script",
            (node) => node.test("src", /\.(tsx?|jsx?)$/),
            (node) => node.sure("src"),
        );
    }

    public reset() {
        return new ApplicationDocument(this.path);
    }

    private resolve(child: parse5.ChildNode,
                    tag: string,
                    test: (node: Node) => boolean,
                    value: (node: Node) => string): string[] {
        if (!this.isElementNode(child)) {
            return [];
        }

        const node = new Node(child);
        const resources: string[] = [];
        if (node.tag === tag && test(node)) {
            this.#registry.set(value(node), node);
            resources.push(value(node));
        }

        const {childNodes} = child;
        return [
            ...resources,
            ...childNodes
                .map((child) => this.resolve(child, tag, test, value))
                .flat(),
        ];
    }

    private findNode(name: string, document?: parse5.ParentNode) {
        const node = document?.childNodes.find((node: parse5.ChildNode): node is parse5.Element => (
            this.isElementNode(node) && node.tagName === name
        ));

        assert(node, `The html element ${name} not found`);

        return node;
    }

    private createDocumentFrom(file: string): parse5.Document {
        const content = fs.readFileSync(file, {encoding: "utf-8"});
        const document = parse5.parse(content);
        assert("nodeName" in document && document.nodeName === "#document");

        return document;
    }

    private isElementNode(node: parse5.ChildNode): node is parse5.Element {
        return "tagName" in node;
    }
}
