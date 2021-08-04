import * as React from "react";
import {XProps} from "../../interfaces";
import {ConfigFactory} from "../../utils";

const config = ConfigFactory.create({component: "hero-head"});

export const HeroHead = config.factory<Record<any, any>, XProps<"div">>(({props, children}) => (
    <div {...props}>{children}</div>
));
