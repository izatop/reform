import * as React from "react";
import {MakeProps} from "../../interfaces";
import {IsColor} from "../../props";
import {ConfigFactory} from "../../utils";

const config = ConfigFactory.create({component: "help"});

export const Help = config.factory<MakeProps<IsColor>>(({props, children}) => (
    <p {...props}>{children}</p>
));
