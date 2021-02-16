import {declare, PropertyPrefixList} from "@reform/base";
import * as React from "react";

const component = "Section";
const prefixes: PropertyPrefixList = [
    ["size", undefined],
];

export const Section = declare("section", {component, prefixes});
