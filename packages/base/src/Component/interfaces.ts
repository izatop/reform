import {ElementList} from "../interfaces";
import {XButton, XContainer, XFooter, XSection, XTitle} from "./props";

export type PropertyPrefixList = [from: string, to: string | undefined][];
export type PropertyPrefixMap = Map<string, string | undefined>;

export interface XElementList {
    button: XButton;
    container: XContainer;
    footer: XFooter;
    section: XSection;
    title: XTitle;
}

export type XElementKey = keyof XElementList;

export interface IDeclareConfig<XK extends keyof XElementList> {
    component?: XK;
    prefixes?: PropertyPrefixList;
}

export type XProp<K extends keyof ElementList, XK extends keyof XElementList> = ElementList[K] & XElementList[XK];
