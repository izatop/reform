export enum Breakpoint {
    Mobile = "mobile",
    Tablet = "tablet",
    Desktop = "desktop",
    Widescreen = "widescreen",
    Fullhd = "fullhd",
}

export type BreakpointType = "mobile" | "tablet" | "desktop" | "widescreen" | "fullhd";

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

export enum Color {
    Primary = "primary",
    Info = "info",
    Success = "success",
    Warning = "warning",
    Danger = "danger",
    Light = "light",
    Dark = "dark",
    White = "white",
    Black = "black",
    Link = "link",
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
| "grey-darker" | "grey-dark" | "grey" | "grey-light" | "grey-lighter"
| "white-ter" | "white-bis" | "text" | "text-strong" | string;

export enum TextAlign {
    Center = "centered",
    Justify = "justified",
    Left = "left",
    Right = "right",
}

export type TextAlignType = TextAlign | "centered" | "justified" | "left" | "right";
