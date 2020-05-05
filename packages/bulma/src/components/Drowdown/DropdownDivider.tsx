import * as React from "react";
import {XProps} from "../../interfaces";
import {ConfigFactory} from "../../utils";

const config = ConfigFactory.create({component: "dropdown-divider"});
export const DropdownDivider = config.factory<{}, XProps<"hr">>(({props}) => (
    <hr {...props}/>
));
