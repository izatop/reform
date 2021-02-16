import {declare, PropertyPrefixList} from "@reform/base";
import * as React from "react";

const component = "Button";
const prefixes: PropertyPrefixList = [
    ["type", undefined],
    ["size", undefined],
];

export const Button = declare("button", {component, prefixes});
