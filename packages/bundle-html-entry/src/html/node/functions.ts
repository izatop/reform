import * as p5 from "parse5";

export const isElement = (value: p5.ChildNode): value is p5.Element => "tagName" in value;

export function parseNS(ns: string) {
    const parts = ns.split(":");
    const [namespace, name] = parts.length > 1 ? parts : ["", ...parts];

    return {namespace, name};
}

export function formatNS(name: string, namespace = "") {
    return namespace.length > 0 ? `${namespace}:${name}` : name;
}
