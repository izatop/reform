import * as React from "react";
import {AreSizes} from "../../props";
import {MakeProps} from "../../type";
import {ConfigFactory} from "../../utils";

export interface ITags extends AreSizes {
    addons?: boolean;
}

const config = ConfigFactory.create({component: "tags"});
export const Tags = config.factory<MakeProps<ITags>>(({props, children}) => (
    <span {...props}>{children}</span>
));
