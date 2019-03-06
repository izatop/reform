import {Color, Size} from "../../enum";
import {MakeProps} from "../../interfaces";

export type ProgressProps = MakeProps<{
    color?: Color;
    size?: Size;
    value?: number;
    max: number;
}>;

export const ProgressOptions = {
    name: "progress",
    is: ["color", "size"],
};
