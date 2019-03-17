import * as React from "react";
import {Helpers} from "../../helpers";
import {calcIconProps, IconOptions, IconProps} from "./props";

export const Icon: React.FunctionComponent<IconProps> = (props) => (
    <span className={Helpers.calcClasses(props, IconOptions)}><i {...calcIconProps(props)} /></span>
);

Icon.displayName = "Icon";
