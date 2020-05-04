import * as React from "react";
import {ElementFactory} from "../../utils";

const config = ElementFactory.create({component: "hero-head"});

export const HeroHead = config.factory(({props, children}) => (
    <div {...props}>{children}</div>
));
