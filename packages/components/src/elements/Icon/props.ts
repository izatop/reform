import {Color, Size} from "../../enum";
import {MakeProps} from "../../interfaces";

export const IconOptions = {
    name: "icon",
    is: ["size", "right", "left", "align"],
    has: [{color: (v: Color) => `text-${v}`}],
};

export enum IconWeight {
    Large = "lg",
    X2 = "2x",
    X3 = "3x",
}

export enum IconFlip {
    Vertical = "v",
    Horizontal = "h",
}

export type IconProps = MakeProps<{
    name?: string;
    size?: Size;
    weight?: IconWeight;
    color?: Color;
    rotate?: number;
    align?: "right" | "left";
    left?: boolean;
    right?: boolean;
    flip?: IconFlip;
}>;

export const calcIconProps = (props: IconProps) => {
    const classes = ["fas", `fa-${props.name}`];
    const options: any = {};

    if (props.weight) {
        classes.push(`fa-${props.weight}`);
    }

    if (props.rotate) {
        Reflect.set(options, "data-fa-transform", `rotate-${props.rotate}`);
    }

    if (props.flip) {
        Reflect.set(options, "data-fa-transform", `flip-${props.flip}`);
    }

    return {className: classes.join(" "), ...options};
};
