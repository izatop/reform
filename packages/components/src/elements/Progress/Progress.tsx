import * as React from "react";
import {Helpers} from "../../helpers";
import {ProgressOptions, ProgressProps} from "./props";

export const Progress: React.FunctionComponent<ProgressProps> = (props) => (
    <progress value={props.value} max={props.max} className={Helpers.calcClasses(props, ProgressOptions)}>
        {props.children || (props.value && `${props.value}%`)}
    </progress>
);
