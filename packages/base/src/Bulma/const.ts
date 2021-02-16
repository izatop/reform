import {ButtonColor} from "./ButtonColor";
import {Color} from "./Color";
import {ComponentSize} from "./ComponentSize";
import {Breakpoint} from "./Breakpoint";

export const ColorList: Color[] = [
    "white",
    "black",
    "light",
    "dark",
    "primary",
    "link",
    "info",
    "success",
    "warning",
    "danger",
];

export const ButtonColorList: ButtonColor[] = [...ColorList, "ghost"];

export const ComponentSizeList: ComponentSize[] = ["normal", "large", "medium", "small"];

export const BreakpointList: Breakpoint[] = ["mobile", "tablet", "desktop", "widescreen", "fullhd"];
