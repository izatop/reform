import * as React from "react";
import {ConfigFactory} from "../../utils";

const config = ConfigFactory.create({component: "hero-body"});

export const HeroContent = config.factory(({props, children}) => (
    <div {...props}>{children}</div>
));
