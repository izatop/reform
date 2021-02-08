import {ElementList} from "../interfaces";
import {XButton} from "./props";

export type PropertyPrefixList = [from: string, to: string | undefined][];
export type PropertyPrefixMap = Map<string, string | undefined>;

export interface IDeclareConfig {
    component?: string | false;
    prefixes?: PropertyPrefixList;
}

export interface XElementList {
    button: XButton;
}

export type XProp<K extends keyof ElementList> = K extends keyof XElementList
    ? ElementList[K] & XElementList[K]
    : ElementList[K];
