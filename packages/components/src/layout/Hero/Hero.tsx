import React from "react";
import {Helpers} from "../../helpers";
import {HeroOptions, HeroProps} from "./props";

export const Hero: React.FC<HeroProps> = (props) => {
    return (
        <section className={Helpers.calcClasses(props, HeroOptions)}>
            {props.children}
        </section>
    );
};

export const HeroHead: React.FC = (props) => (
    <div className={"hero-head"}>{props.children}</div>
);

export const HeroContent: React.FC = (props) => (
    <div className={"hero-body"}>{props.children}</div>
);

export const HeroFoot: React.FC = (props) => (
    <div className={"hero-foot"}>{props.children}</div>
);

Hero.displayName = "Hero";
HeroHead.displayName = "HeroHead";
HeroContent.displayName = "HeroContent";
HeroFoot.displayName = "HeroFoot";
