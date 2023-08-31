import {parse} from "parse5";

import {P5Pick} from "./p5";

export type IS1 = (value: P5Pick<"node">) => value is P5Pick<"element">;
export type IS2 = (value: P5Pick<"node">) => value is P5Pick<"parentNode">;
export type IS3 = (value: P5Pick<"node">) => value is P5Pick<"textNode">;

export const isElement: IS1 = (value: P5Pick<"node">): value is P5Pick<"element"> => "tagName" in value;
export const isParentNode: IS2 = (value: P5Pick<"node">): value is P5Pick<"parentNode"> => "childNodes" in value;
export const isTextNode: IS3 = (value: P5Pick<"node">): value is P5Pick<"textNode"> => value.nodeName === "#text";

export function parseNS(ns: string) {
    const parts = ns.split(":");
    const [namespace, name] = parts.length > 1 ? parts : ["", ...parts];

    return {namespace, name};
}

export function formatNS(name: string, namespace = "") {
    return namespace.length > 0 ? `${namespace}:${name}` : name;
}

export function parseHTML(contents: string): P5Pick<"document"> {
    return parse(contents, {scriptingEnabled: false});
}
