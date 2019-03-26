import * as React from "react";
import {ElementFactory} from "../../utils";

const config = ElementFactory.create({component: "hero-foot"});

export const HeroFoot = config.factory(({props, children}) => (
    <div {...props}>{children}</div>
));
