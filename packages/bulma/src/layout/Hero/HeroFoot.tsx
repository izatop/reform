import * as React from "react";
import {MakeProps, XProps} from "../../interfaces";
import {ConfigFactory} from "../../utils";

const config = ConfigFactory.create({component: "hero-foot"});

export const HeroFoot = config.factory<MakeProps, XProps<"div">>(({props, children}) => (
    <div {...props}>{children}</div>
));
