import {PropertyPrefixList} from "./interfaces";

const common: PropertyPrefixList = [];
const namespaces = ["is", "has", "are"];

export function isOwnNamespace(ns: string) {
    return namespaces.includes(ns);
}

export function createComponentPrefixes(prefixes?: PropertyPrefixList) {
    return new Map([...common, ...prefixes ?? []]);
}

export function getClassNameFromList(classNames: string[]): string {
    if (!classNames.length) {
        return "";
    }

    if (classNames.length === 1) {
        return classNames[0];
    }

    if (classNames.length === 2 && classNames[0] !== classNames[1]) {
        return classNames.join(" ");
    }

    return [...new Set(classNames).values()].join(" ");
}

export function hasNotPrefix<K extends string>(property: string): property is K {
    return !property.includes(":");
}

export function hasPrefix(property: string) {
    return property.startsWith(":");
}
