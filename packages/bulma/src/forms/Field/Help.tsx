import * as React from "react";
import {IsColor} from "../../props";
import {MakeProps} from "../../type";
import {ConfigFactory} from "../../utils";

const config = ConfigFactory.create({component: "help"});

export const Help = config.factory<MakeProps<IsColor>>(({props, children}) => (
    <p {...props}>{children}</p>
));
