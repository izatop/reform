import * as React from "react";
import {Helpers} from "../../helpers";
import {CardOptions, CardProps} from "./props";

export const Card: React.FunctionComponent<CardProps> = (props) => (
    <div className={Helpers.calcClasses(props, CardOptions)}>
        {props.children}
    </div>
);
