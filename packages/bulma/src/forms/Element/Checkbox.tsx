import { Children } from "react";
import {MakeProps} from "../../interfaces";
import {ConfigFactory} from "../../utils";

const config = ConfigFactory.create({component: "checkbox"});
export const Checkbox = config.factoryRef<"input", MakeProps>(({props, children}) => (
    <label className={"checkbox"}>
        <input type={"checkbox"}
            {...props} />
        {Children.count(children) > 0 && <>&nbsp;{children}</>}
    </label>
));
