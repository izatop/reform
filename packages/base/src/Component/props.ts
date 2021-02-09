import {ButtonColor, Color, ComponentSize, GreyShade, ScreenList, TextAlign} from "../Bulma";
import {MaybeArray, MergeWithSuffix} from "../interfaces";

export type XHasText = MaybeArray<MergeWithSuffix<TextAlign, ScreenList> | Color | GreyShade>;

export interface XButton {
    "is:type"?: ButtonColor;
    "is:size"?: ComponentSize;
    "is:light"?: boolean;
    "is:static"?: boolean;
    "is:fullwidth"?: boolean;
    "is:outlined"?: boolean;
    "is:inverted"?: boolean;
    "is:rounded"?: boolean;
}

export interface XSection {
    "is:size"?: "large" | "medium";
}

export interface XFooter {}

export interface XContainer {}

export interface XTitle {}
