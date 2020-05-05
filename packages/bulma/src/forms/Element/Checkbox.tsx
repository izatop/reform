import * as React from "react";
import {XProps} from "../../interfaces";
import {MakeProps} from "../../type";
import {ConfigFactory} from "../../utils";

const config = ConfigFactory.create({component: "checkbox"});
export const Checkbox = config.factory<MakeProps, XProps<"input">>(({props, children}) => (
    <label className={"checkbox"}>
        <input type={"checkbox"}
               {...props} />
        {React.Children.count(children) > 0 && <>&nbsp;{children}</>}
    </label>
));
