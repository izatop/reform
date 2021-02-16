import {declare, PropertyPrefixList} from "@reform/base";

const component = "Columns";
const prefixes: PropertyPrefixList = [["breakpoint", undefined], ["gap", undefined]];

export const Columns = declare("div", {component, prefixes});
