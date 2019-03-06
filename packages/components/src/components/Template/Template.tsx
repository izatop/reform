import * as React from "react";
import {calcClasses} from "../../helpers";
import {Options, Props} from "./props";

export const Template: React.FunctionComponent<Props> = (props) => (
    <div className={calcClasses(props, Options)}>
        {props.children}
    </div>
);
