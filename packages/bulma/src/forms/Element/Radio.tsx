import * as React from "react";
import {MakeProps} from "../../interfaces";
import {ConfigFactory} from "../../utils";

const config = ConfigFactory.create({component: "radio"});
export const Radio = config.factoryRef<"input", MakeProps>(({props, children}) => (
    <label className={"radio"}>
        <input type={"radio"}
            {...props} />
        &nbsp;{children}
    </label>
));
