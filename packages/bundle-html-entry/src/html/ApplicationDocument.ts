import * as p5 from "parse5";
import {Format} from "esbuild";
import {assert, File, FileContentType} from "@reform/bundle";
import {Document} from "./node/Document";
import {Element} from "./node/Element";

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
                    const href = link.ensureAttribute("href");
                    sources.push([href.value, href]);
                    break;

                default:
                    if (/^apple-.+-image$/.test(rel.value)) {
                        const href = link.ensureAttribute("href");
                        sources.push([href.value, href]);
                    }
            }
        }

        return sources;
    }

    public build<C extends FileContentType>(entry: File<C>, publicPath: string, format: Format, pretty = false) {
        for (const source of this.#document.child.query("script")) {
            source.remove();
        }

        const [body] = this.#document.child.query("body");
        assert(body, "Document body element not found");

        const script = Element.append(body, "script");
        script.setAttribute("src", `${publicPath}/${entry.relative}?${entry.getHash()}`);
        script.setAttribute("async");
        script.setAttribute("type", format === "esm" ? "module" : "text/javascript");

        return this.#document.serialize(pretty);
    }
}
