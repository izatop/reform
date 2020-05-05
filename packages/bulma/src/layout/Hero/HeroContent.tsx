import * as React from "react";
import {MakeProps, XProps} from "../../interfaces";
import {ConfigFactory} from "../../utils";

const config = ConfigFactory.create({component: "hero-body"});

export const HeroContent = config.factory<MakeProps, XProps<"div">>(({props, children}) => (
    <div {...props}>{children}</div>
));
