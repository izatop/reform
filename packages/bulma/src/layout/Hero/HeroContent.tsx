import * as React from "react";
import {ElementFactory} from "../../utils";

const config = ElementFactory.create({component: "hero-body"});

export const HeroContent = config.factory(({props, children}) => (
    <div {...props}>{children}</div>
));
