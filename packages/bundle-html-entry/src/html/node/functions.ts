import * as p5 from "parse5";

export const isElement = (value: p5.Node): value is p5.Element => "tagName" in value;
export const isParentNode = (value: p5.Node): value is p5.ParentNode => "childNodes" in value;
export const isTextNode = (value: p5.Node): value is p5.TextNode => value.nodeName === "#text";

export function parseNS(ns: string) {
    const parts = ns.split(":");
    const [namespace, name] = parts.length > 1 ? parts : ["", ...parts];

    return {namespace, name};
}

export function formatNS(name: string, namespace = "") {
    return namespace.length > 0 ? `${namespace}:${name}` : name;
}

export function parseHTML(contents: string) {
    return p5.parse(contents, {scriptingEnabled: false});
}
