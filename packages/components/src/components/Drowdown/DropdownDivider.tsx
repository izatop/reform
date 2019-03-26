import * as React from "react";
import {XProps} from "../../interfaces";
import {ElementFactory} from "../../utils";

const config = ElementFactory.create({component: "dropdown-divider"});

export const DropdownDivider = config.factory<{}, XProps<"hr">>(({props}) => (
    <hr {...props}/>
));
