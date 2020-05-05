import React, {ReactElement} from "react";
import {MakeProps, XProps} from "../../interfaces";
import {ColorType} from "../../options";
import {ConfigFactory} from "../../utils";

export enum HeroSize {
    Medium = "medium",
    Large = "large",
    FullHeight = "fullheight",
}

export type HeroSizeType = HeroSize | "medium" | "large" | "fullheight";

export interface IHero {
    "is-size"?: HeroSizeType;
    "is-color"?: ColorType;
    "is-bold"?: boolean;
    "is-navbar"?: boolean;
}

export type HeroProps = XProps<"section"> & {
    children: ReactElement | [ReactElement, ReactElement?, ReactElement?];
};

const config = ConfigFactory.create({
    component: "hero",
    resolvers: {
        navbar: () => "fullheight-with-navbar",
    },
});

export const Hero = config.factory<MakeProps<IHero>, HeroProps>(({props, children}) => {
    return (
        <section {...props}>
            {children}
        </section>
    );
});
