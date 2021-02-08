import * as assert from "assert";
import * as fs from "fs";
import * as parse5 from "parse5";
import {resolveAt} from "../internal";
import {BundleArtifactAbstract} from "./BundleArtifactAbstract";
import {BundleScript} from "./BundleScript";

export type HTMLResourceTuple = [res: string, node: parse5.Element];

export class HTMLDocumentEntry extends BundleArtifactAbstract {
    readonly #document: parse5.Document;
    readonly #resources: HTMLResourceTuple[];

    constructor(file: string) {
        super(file);
        this.#document = this.read(file);
        this.#resources = this.resolveEntryPoints();
    }

    public getResourceList() {
        return this.#resources.map(([file]) => file);
    }

    public async commit(context: BundleScript): Promise<void> {
        const {build} = context;
        const savePath = resolveAt(build.path, this.path.replace(build.source, ""));
        for (const [file, resource] of this.#resources) {
            const publicFile = file.replace(build.source, "").replace(/\.tsx?$/, ".js");
            switch (resource.tagName) {
                case "link":
                    this.setAttribute(resource, "href", publicFile);
                    break;
                case "script":
                    this.setAttribute(resource, "src", publicFile);
                    break;
                default:
                    console.warn(`Unknown resource: ${resource.tagName}`);
            }
        }

        fs.writeFileSync(savePath, parse5.serialize(this.#document), {encoding: "utf-8"});
    }

    private resolveEntryPoints(): HTMLResourceTuple[] {
        const {childNodes} = this.#document;
        const html = childNodes.find((item) => item.nodeName === "html");
        assert(html, "The \"html\" node not found");

        return [
            ...this.resolveResourceList(html, "script", "src", /\.(tsx?|jsx?)$/),
            ...this.resolveResourceList(html, "link", "href", /\.scss$/),
        ];
    }

    private resolveResourceList(node: parse5.ChildNode, tag: string, ref: string, re: RegExp): HTMLResourceTuple[] {
        if (!this.isElementNode(node)) {
            return [];
        }

        const resources: HTMLResourceTuple[] = [];
        if (node.tagName === tag) {
            const src = this.getAttribute(node, ref);
            if (src && re.test(src)) {
                resources.push([src, node]);
            }
        }

        if (node.childNodes.length) {
            resources.push(
                ...node.childNodes
                    .map((child) => this.resolveResourceList(child, tag, ref, re))
                    .flat(),
            );
        }

        return resources;
    }

    private getAttribute(node: parse5.Element, name: string) {
        return node.attrs.find((item) => item.name === name)?.value;
    }

    private setAttribute(node: parse5.Element, name: string, value: string) {
        const exists = node.attrs.find((item) => item.name === name);
        if (exists) {
            exists.value = value;
            return;
        }

        node.attrs.push({value, name});
    }

    private isElementNode(node: parse5.ChildNode): node is parse5.Element {
        return "tagName" in node;
    }

    private read(file: string): parse5.Document {
        const content = fs.readFileSync(file, {encoding: "utf-8"});
        const document = parse5.parse(content);
        assert("nodeName" in document && document.nodeName === "#document");

        return document;
    }
}
