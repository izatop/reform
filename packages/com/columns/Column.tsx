import {declare, PropertyPrefixList} from "@reform/base";

const component = "Column";
const prefixes: PropertyPrefixList = [["size", undefined]];

export const Column = declare("div", {component, prefixes});
