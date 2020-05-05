import * as React from "react";
import {XProps} from "../../interfaces";
import {ColorType, SizeType} from "../../options";
import {IsColor, IsSize} from "../../props";
import {MakeProps} from "../../type";
import {ElementFactory} from "../../utils";

export interface IProgress extends IsColor, IsSize {}

const config = ElementFactory.create({component: "progress"});
export const Progress = config.factory<MakeProps<IProgress>, XProps<"progress">>(({props, children}) => (
    <progress {...props}>
        {children || (props.value && `${props.value}%`)}
    </progress>
));
