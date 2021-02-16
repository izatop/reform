import {
    Breakpoint,
    ButtonColor,
    Color,
    ComponentSize,
    GreyShade,
    GridGap,
    GridSize,
    TextAlign,
    TextSize,
} from "../Bulma";
import {MaybeArray, MergeWithSuffix} from "../interfaces";

export type XHasText = MaybeArray<MergeWithSuffix<TextAlign, Breakpoint>
    | MergeWithSuffix<TextSize, Breakpoint>
    | Color
    | GreyShade>;

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

export interface XFooter {
    "is:text"?: XHasText;
}

export interface XContainer {
    "is:text"?: XHasText;
}

export interface XTitle {
    "is:text"?: XHasText;
}

export interface XSubtitle {}

export interface XColumn {
    "is:text"?: XHasText;
    "is:size"?: GridSize;
    "is:offset"?: GridSize;
    "is:narrow"?: boolean | Breakpoint[];
}

export interface XColumns {
    "is:text"?: XHasText;
    "is:gapless"?: boolean;
    "is:multiline"?: boolean;
    "is:screen"?: Breakpoint;
    "is:variable"?: boolean;
    "is:gap"?: MaybeArray<MergeWithSuffix<GridGap, Breakpoint>>;
    "is:centered"?: boolean;
    "is:vcentered"?: boolean;
}
