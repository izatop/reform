import * as React from "react";
import {IsColor} from "../../props";
import {MakeProps} from "../../type";
import {ElementFactory} from "../../utils";

const config = ElementFactory.create({component: "help"});

export const Help = config.factory<MakeProps<IsColor>>(({props, children}) => (
    <p {...props}>{children}</p>
));
