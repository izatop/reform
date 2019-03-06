import {MakeProps} from "../../interfaces";

export enum ImageDimension {
    D16x16 = "16x16",
    D24x24 = "24x24",
    D48x48 = "48x48",
    D64x64 = "64x64",
    D96x96 = "96x96",
    D128x128 = "128x128",
}

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

export type ImageProps = MakeProps<{
    sizes?: string;
    src?: string;
    srcSet?: string;
    alt?: string;
    title?: string;
    dimension?: ImageDimension;
    ratio?: ImageRatio;
    rounded?: boolean;
}>;

export const FigureOptions = {
    name: "image",
    is: ["dimension", "ratio"],
};

export const ImageOptions = {
    is: ["rounded"],
};
