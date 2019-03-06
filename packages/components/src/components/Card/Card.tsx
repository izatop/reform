import * as React from "react";
import {calcClasses} from "../../helpers";
import {CardOptions, CardProps} from "./props";

export const Card: React.FunctionComponent<CardProps> = (props) => (
    <div className={calcClasses(props, CardOptions)}>
        {props.children}
    </div>
);
