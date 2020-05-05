import * as React from "react";
import {MakeProps, XProps} from "../../interfaces";
import {IsColor, IsSize} from "../../props";
import {ConfigFactory} from "../../utils";

export interface IProgress extends IsColor, IsSize {}

const config = ConfigFactory.create({component: "progress"});
export const Progress = config.factory<MakeProps<IProgress>, XProps<"progress">>(({props, children}) => (
    <progress {...props}>
        {children || (props.value && `${props.value}%`)}
    </progress>
));
