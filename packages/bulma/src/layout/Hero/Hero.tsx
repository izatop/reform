import * as React from "react";
import {ReactElement} from "react";
import {MakeProps, XProps} from "../../interfaces";
import {IsColor} from "../../props";
import {ConfigFactory} from "../../utils";

export enum HeroSize {
    Medium = "medium",
    Large = "large",
    FullHeight = "fullheight",
}

export type HeroSizeType = HeroSize | "medium" | "large" | "fullheight";

export interface IHero extends IsColor {
    size?: HeroSizeType;
    bold?: boolean;
    navbar?: boolean;
}

export type HeroProps = XProps<"section"> & {
    children: ReactElement | [ReactElement, ReactElement?, ReactElement?];
};

const config = ConfigFactory.create({
    component: "hero",
    resolvers: {
        navbar: "is-fullheight-with-navbar",
        bold: "is-bold",
        size: (v) => `is-${v}`,
    },
});

export const Hero = config.factory<MakeProps<IHero>, HeroProps>(({props, children}) => {
    return (
        <section {...props}>
            {children}
        </section>
    );
});
