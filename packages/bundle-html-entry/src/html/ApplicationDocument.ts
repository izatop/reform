import * as p5 from "parse5";
import {Format} from "esbuild";
import {assert, File, FileContentType} from "@reform/bundle";
import {Document} from "./node/Document";
import {Element} from "./node/Element";
import {Attachable} from "../interface";

export class ApplicationDocument {
    readonly #document: Document;

    constructor(contents: string) {
        this.#document = new Document(contents);
    }

    public getEntries() {
        const entries: string[] = [];
        const scripts = this.#document.child.query("script");

        const mime = ["text/javascript", "module"];
        for (const script of scripts) {
            const type = script.getAttribute("type");
            if (type && mime.includes(type.value)) {
                entries.push(script.ensureAttribute("src").value);
            }
        }

        return entries;
    }

    public getArtifacts() {
        const sources: [string, p5.Attribute][] = [];
        const links = this.#document.child.query("link");
        for (const link of links) {
            const rel = link.getAttribute("rel");
            if (!rel) {
                continue;
            }

            switch (rel.value) {
                case "icon":
                case "manifest":
                case "stylesheet":
                case "apple-touch":
                case "apple-touch-startup-image":
                    const href = link.ensureAttribute("href");
                    sources.push([href.value, href]);

                    break;

                default:
                    if (/^apple-touch$/.test(rel.value)) {
                        const href = link.ensureAttribute("href");
                        sources.push([href.value, href]);
                    }
            }
        }

        return sources;
    }

    public build<C extends FileContentType>(entry: File<C>,
        attachable: Attachable,
        publicPath: string,
        format: Format,
        pretty = false) {
        for (const source of this.#document.child.query("script")) {
            source.remove();
        }

        const [body] = this.#document.child.query("body");
        assert(body, "Document body element not found");

        const script = Element.append(body, "script");
        script.setAttribute("src", `${publicPath}/${entry.relative}`);
        script.setAttribute("async");
        script.setAttribute("type", format === "esm" ? "module" : "text/javascript");

        if (attachable.stylesheet) {
            this.attachStylesheet(publicPath, attachable.stylesheet);
        }

        return this.#document.serialize(pretty);
    }

    private attachStylesheet(publicPath: string, files: string[]) {
        const head = this.#document.child.ensureFirst("head");
        for (const file of files) {
            const link = Element.append(head, "link");
            link.setAttribute("href", `${publicPath}/${file}`);
            link.setAttribute("type", "text/css");
            link.setAttribute("rel", "stylesheet");
        }
    }
}
