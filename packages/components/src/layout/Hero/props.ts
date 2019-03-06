import React, {ReactElement} from "react";
import {Color} from "../../enum";
import {MakeProps} from "../../interfaces";

export enum HeroSize {
    Medium = "medium",
    Large = "large",
    FullHeight = "fullheight",
}

export const HeroOptions = {
    name: "hero",
    is: [
        "size",
        "color",
        "bold",
        {
            navbar: () => "fullheight-with-navbar",
        },
    ],
};

export type HeroProps = MakeProps<{
    size?: HeroSize;
    color?: Color;
    bold?: true;
    navbar?: true;
    children: ReactElement | [ReactElement, ReactElement?, ReactElement?];

}>;
