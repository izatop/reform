import React from "react";
import {calcClasses} from "../../helpers";
import {HeroOptions, HeroProps} from "./props";

export const Hero: React.FC<HeroProps> = (props) => {
    return (
        <section className={calcClasses(props, HeroOptions)}>
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
