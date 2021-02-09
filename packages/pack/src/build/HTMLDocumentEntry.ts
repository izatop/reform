import * as assert from "assert";
import {Metadata} from "esbuild";
import * as fs from "fs";
import * as parse5 from "parse5";
import * as path from "path";
import {relativeTo, resolveAt} from "../internal";
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
        const {args, build, metaFile} = context;
        const savePath = resolveAt(build.path, relativeTo(build.source, this.path));

        const stylesheet: string[] = [];
        const preload: string[] = [];
        const preloadSet = new Set([".js", ".css"]);
        const metadata: Metadata = JSON.parse(fs.readFileSync(metaFile, {encoding: "utf-8"}));
        for (const [key] of Object.entries(metadata.outputs)) {
            if (preloadSet.has(path.extname(key))) {
                preload.push(relativeTo(build.path, resolveAt(args.path, key)));
            }

            if (key.endsWith(".css")) {
                stylesheet.push(relativeTo(build.path, resolveAt(args.path, key)));
            }
        }

        for (const [file, resource] of this.#resources) {
            const publicFile = file.replace(/\.tsx?$/, ".js");
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

        const head = this.getHeadElement();
        assert(head, "The document node \"head\" not found");

        for (const item of stylesheet) {
            head.childNodes.push({
                parentNode: head,
                nodeName: "link",
                tagName: "link",
                namespaceURI: "",
                childNodes: [],
                attrs: [
                    {name: "crossorigin", value: "anonymous"},
                    {name: "rel", value: "stylesheet"},
                    {name: "href", value: item},
                ],
            });
        }

        for (const item of preload) {
            const as = item.endsWith(".css")
                ? "style"
                : (item.endsWith(".js")
                        ? "script"
                        : undefined
                );

            if (!as) {
                continue;
            }

            head.childNodes.push({
                parentNode: head,
                nodeName: "link",
                tagName: "link",
                namespaceURI: "",
                childNodes: [],
                attrs: [
                    {name: "crossorigin", value: "anonymous"},
                    {name: "rel", value: "preload"},
                    {name: "href", value: item},
                    {name: "as", value: as},
                ],
            });
        }

        fs.writeFileSync(savePath, parse5.serialize(this.#document), {encoding: "utf-8"});
    }

    private getHeadElement(): parse5.Element | undefined {
        const findNode = (name: string, document?: parse5.ParentNode) => {
            return document?.childNodes.find((node: parse5.ChildNode): node is parse5.Element => (
                this.isElementNode(node) && node.tagName === name
            ));
        };

        return findNode("head", findNode("html", this.#document));
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
