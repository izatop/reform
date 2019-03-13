import * as React from "react";
import {Helpers} from "../../helpers";
import {Options, Props} from "./props";

export const Template: React.FunctionComponent<Props> = (props) => (
    <div className={Helpers.calcClasses(props, Options)}>
        {props.children}
    </div>
);
