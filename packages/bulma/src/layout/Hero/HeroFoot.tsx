import * as React from "react";
import {ConfigFactory} from "../../utils";

const config = ConfigFactory.create({component: "hero-foot"});

export const HeroFoot = config.factory(({props, children}) => (
    <div {...props}>{children}</div>
));
