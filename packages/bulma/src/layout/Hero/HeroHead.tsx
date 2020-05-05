import * as React from "react";
import {ConfigFactory} from "../../utils";

const config = ConfigFactory.create({component: "hero-head"});

export const HeroHead = config.factory(({props, children}) => (
    <div {...props}>{children}</div>
));
