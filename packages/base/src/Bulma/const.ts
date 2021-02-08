import {ButtonColor} from "./ButtonColor";
import {Color} from "./Color";
import {ComponentSize} from "./ComponentSize";

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
