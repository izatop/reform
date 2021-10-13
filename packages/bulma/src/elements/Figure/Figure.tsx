import {XProps} from "../../interfaces";
import {ConfigFactory} from "../../utils";

export enum ImageDimension {
    D16x16 = "16x16",
    D24x24 = "24x24",
    D48x48 = "48x48",
    D64x64 = "64x64",
    D96x96 = "96x96",
    D128x128 = "128x128",
}

export type ImageDimensionType = ImageDimension | "16x16" | "24x24" | "48x48" | "64x64" | "96x96" | "128x128";

export enum ImageRatio {
    Square = "square",
    R1by1 = "1by1",
    R5by4 = "5by4",
    R4by3 = "4by3",
    R3by2 = "3by2",
    R5by3 = "5by3",
    R16by9 = "16by9",
    R2by1 = "2by1",
    R3by1 = "3by1",
    R4by5 = "4by5",
    R3by4 = "3by4",
    R2by3 = "2by3",
    R3by5 = "3by5",
    R9by16 = "9by16",
    R1by2 = "1by2",
    R1by3 = "1by3",
}

export type ImageRatioType = ImageRatio | "square" | "1by1" | "5by4" | "4by3" | "3by2"
| "5by3" | "16by9" | "2by1" | "3by1" | "4by5" | "3by4" | "2by3" | "3by5" | "9by16"
| "1by2" | "1by3";

interface IFigure {
    dimension: ImageRatioType | ImageDimensionType;
}

const config = ConfigFactory.create({
    component: "image",
    resolvers: {
        dimension: (v) => `is-${v}`,
    },
});

export const Figure = config.factory<IFigure, XProps<"figure">>(({props, children}) => (
    <figure {...props}>
        {children}
    </figure>
));
