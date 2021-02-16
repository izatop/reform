import {ElementList} from "../interfaces";
import {XButton, XColumn, XColumns, XContainer, XFooter, XSection, XSubtitle, XTitle} from "./props";

export type PropertyPrefixList = [from: string, to: string | undefined][];
export type PropertyPrefixMap = Map<string, string | undefined>;

export interface XElementList {
    Button: XButton;
    Container: XContainer;
    Footer: XFooter;
    Section: XSection;
    Title: XTitle;
    Subtitle: XSubtitle;
    Column: XColumn;
    Columns: XColumns;
}

export type XElementKey = keyof XElementList;

export interface IDeclareConfig<XK extends keyof XElementList> {
    component: XK;
    prefixes?: PropertyPrefixList;
}

export type XProp<K extends keyof ElementList, XK extends keyof XElementList> = ElementList[K] & XElementList[XK];
