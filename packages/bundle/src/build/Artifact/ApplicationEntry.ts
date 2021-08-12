import {ok} from "assert";
import * as crypto from "crypto";
import {BuildResult} from "esbuild";
import * as fs from "fs";
import * as parse5 from "parse5";
import * as path from "path";
import {assert} from "../../internal";
import {BundleArtifactAbstract} from "../BundleArtifactAbstract";
import {BundleScript} from "../BundleScript";
import {ApplicationDocument} from "./ApplicationDocument";

export class ApplicationEntry extends BundleArtifactAbstract {
    #document: ApplicationDocument;

    constructor(path: string) {
        super();
        this.#document = new ApplicationDocument(path);
    }

    public get document() {
        return this.#document;
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    public async prepare(context: BundleScript): Promise<void> {
        return Promise.resolve(undefined);
    }

    public async commit(bundleScript: BundleScript, result: BuildResult): Promise<void> {
        this.#document = this.#document.reset();
        const {args, config: {build, base}} = bundleScript;
        const documentPath = this.#document.path;
        const saveFile = path.join(build, path.relative(base, documentPath));
        const entryPath = path.dirname(documentPath);
        const savePath = path.dirname(saveFile);
        const read = (file: string) => fs.readFileSync(file, {encoding: "utf-8"});
        const resolveAtEntry = (file: string) => path.join(entryPath, file);

        const fileList = this.#document.getFileList();
        const stylesheet: string[] = [];
        const realpath = new Map();
        const {metafile: {outputs = {}} = {}} = result;
        const withHash = (file: string, normalize = (v: string) => v) => {
            const filePath = realpath.get(file);
            if (filePath) {
                const hash = crypto.createHash("sha1")
                    .update(fs.readFileSync(filePath))
                    .digest("hex");

                return `${normalize(file)}?${hash.substr(0, 6)}`;
            }

            return normalize(file);
        };

        for (const [key] of Object.entries(outputs)) {
            const file = path.relative(build, path.join(args.path, key));
            realpath.set(file, path.join(args.path, key));

            if (file.endsWith(".css")) {
                stylesheet.push(file);
            }
        }

        for (const script of this.#document.getScripts()) {
            const node = this.#document.registry.get(script);
            assert(node, `Registry.has(${script}): false`);
            assert(node.tag === "script", `Wrong script node ${node.tag}`);
            node.set("src", withHash(script.replace(/\.tsx?$/, ".js"), (res) => this.normalize(res)));
        }

        for (const item of stylesheet) {
            this.#document.head.childNodes.push({
                parentNode: this.#document.head,
                nodeName: "link",
                tagName: "link",
                namespaceURI: "",
                childNodes: [],
                attrs: [
                    {name: "crossorigin", value: "anonymous"},
                    {name: "rel", value: "preload"},
                    {name: "href", value: withHash(item, (res) => this.normalize(res))},
                    {name: "as", value: "style"},
                ],
            });
        }

        for (const item of stylesheet) {
            this.#document.head.childNodes.push({
                parentNode: this.#document.head,
                nodeName: "link",
                tagName: "link",
                namespaceURI: "",
                childNodes: [],
                attrs: [
                    {name: "crossorigin", value: "anonymous"},
                    {name: "rel", value: "stylesheet"},
                    {name: "href", value: withHash(item, (res) => this.normalize(res))},
                ],
            });
        }

        const webManifestFile = this.#document.getWebManifest();
        if (webManifestFile) {
            const node = this.#document.registry.get(webManifestFile);
            if (node) {
                node.set("href", this.normalize(webManifestFile));
            }

            const manifest = JSON.parse(read(resolveAtEntry(webManifestFile)));
            if (typeof manifest.icons === "string") {
                const file = manifest.icons;
                manifest.icons = JSON.parse(read(resolveAtEntry(file)));
                for (const icon of manifest.icons) {
                    const resolved = path.join(path.dirname(file), icon.src);
                    fileList.push(resolved);
                    icon.src = this.normalize(resolved);
                }
            }

            if (typeof manifest.shortcuts === "string") {
                const file = manifest.shortcuts;
                manifest.shortcuts = JSON.parse(read(resolveAtEntry(file)));
                for (const shortcut of manifest.shortcuts) {
                    for (const icon of shortcut.icons) {
                        const resolved = path.join(path.dirname(file), icon.src);
                        fileList.push(resolved);
                        icon.src = this.normalize(resolved);
                    }
                }
            }

            fs.writeFileSync(
                path.join(savePath, webManifestFile),
                JSON.stringify(manifest, null, 2),
                {encoding: "utf-8"},
            );
        }

        const ops = [];
        for (const file of fileList) {
            const source = path.join(entryPath, file);
            const destination = path.join(savePath, file);
            const op = new Promise((resolve, reject) => {
                try {
                    fs.mkdirSync(path.dirname(destination), {recursive: true});
                    fs.writeFileSync(destination, fs.readFileSync(source));
                } catch (error) {
                    reject(error);
                }
            });

            ops.push(op);
        }

        fs.writeFileSync(saveFile, parse5.serialize(this.#document.document), {encoding: "utf-8"});

        await Promise.all(ops);
    }

    private normalize(url: string) {
        return `/${url.replace(/^\//, "")}`;
    }
}
