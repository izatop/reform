import {IPropertyResolvers} from "./type";

export enum Breakpoint {
    Mobile = "mobile",
    Tablet = "tablet",
    Touch = "touch",
    Desktop = "desktop",
    Widescreen = "widescreen",
    Fullhd = "fullhd",
}

export type BreakpointType = Breakpoint | "mobile" | "tablet" | "touch" | "desktop" | "widescreen" | "fullhd";

export enum TextTransform {
    Capitalize = "capitalized",
    Lowercase = "lowercase",
    Uppercase = "uppercase",
    Italic = "italic",
}

export type TextTransformType = TextTransform | "capitalized" | "lowercase" | "uppercase" | "italic";

export enum TextWeight {
    Light = "light",
    Normal = "normal",
    Semibold = "semibold",
    Bold = "bold",
}

export type TextWeightType = TextWeight | "light" | "normal" | "semibold" | "bold";

export enum FontFamily {
    SansSerif = "sans-serif",
    Monospace = "monospace",
    Primary = "primary",
    Secondary = "secondary",
    Code = "code",
}

export type FontFamilyType = FontFamily | "sans-serif" | "monospace" | "primary" | "secondary" | "code";

export enum TextSize {
    XSmall = 7,
    small = 6,
    Normal = 5,
    Medium = 4,
    Large = 3,
    XLarge = 2,
    XXLarge = 1,
}

export type TextSizeType = TextSize | 1 | 2 | 3 | 4 | 5 | 6 | 7;

export enum Size {
    Small = "small",
    Normal = "normal",
    Medium = "medium",
    Large = "large",
}

export type SizeType = Size | "small" | "medium" | "large" | "normal";

export enum Helper {
    Clearfix = "clearfix",
    PullLeft = "pulled-left",
    PullRight = "pulled-right",
    Marginless = "marginless",
    Paddingless = "paddingless",
    Overlay = "overlay",
    Clipped = "clipped",
    Radiusless = "radiusless",
    Shadowless = "shadowless",
    Unselectable = "unselectable",
    Invisible = "invisible",
    SROnly = "sr-only",
}

export enum Display {
    Block = "block",
    Flex = "flex",
    Inline = "inline",
    InlineBlock = "inline-block",
    InlineFlex = "inline-flex",
}

export enum Color {
    White = "white",
    Black = "black",
    Light = "light",
    Dark = "dark",
    Primary = "primary",
    Info = "info",
    Link = "link",
    Success = "success",
    Warning = "warning",
    Danger = "danger",
    BlackBis = "black-bis",
    BlackTer = "black-ter",
    GreyDarker = "grey-darker",
    GreyDark = "grey-dark",
    Grey = "grey",
    GreyLigth = "grey-light",
    GreyLighter = "grey-lighter",
    WhiteTer = "white-ter",
    WhiteBis = "white-bis",
}

export type ColorType = Color | "white" | "black" | "light" | "dark" | "primary" | "info"
    | "link" | "success" | "warning" | "danger" | "black-bis" | "black-ter"
    | "grey-darker" | "grey-darker" | "grey-dark" | "grey" | "grey-light"
    | "grey-lighter" | "white-ter" | "white-bis";

export enum TextAlign {
    Center = "centered",
    Justify = "justified",
    Left = "left",
    Right = "right",
}

export type TextAlignType = TextAlign | "centered" | "justified" | "left" | "right";

export type Align = "centered" | "right";

export enum Prefixes {
    IS = "is",
    HAS = "has",
    ARE = "are",
    X = "x",
}

export const ComponentDefaultResolvers: IPropertyResolvers = {
    "breakpoint": (value) => value,
    "text-color": (value) => `text-${value}`,
    "text-align": (value) => `text-${value}`,
    "text-size": (value) => `size-${value}`,
    "text-weight": (value) => `text-weight-${value}`,
    "text-transform": (value) => value,
    "font-family": (value) => `family-${value}`,
};
