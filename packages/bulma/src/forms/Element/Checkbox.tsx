import * as React from "react";
import {MakeProps, XProps} from "../../interfaces";
import {ConfigFactory} from "../../utils";

const config = ConfigFactory.create({component: "checkbox"});
export const Checkbox = config.factory<MakeProps, XProps<"input">>(({props, children}) => (
    <label className={"checkbox"}>
        <input type={"checkbox"}
               {...props} />
        {React.Children.count(children) > 0 && <>&nbsp;{children}</>}
    </label>
));
