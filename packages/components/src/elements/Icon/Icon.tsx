import * as React from "react";
import {calcClasses} from "../../helpers";
import {calcIconProps, IconOptions, IconProps} from "./props";

export const Icon: React.FunctionComponent<IconProps> = (props) => (
    <span className={calcClasses(props, IconOptions)}><i {...calcIconProps(props)} /></span>
);
