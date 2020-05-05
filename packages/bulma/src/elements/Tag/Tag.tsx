import * as React from "react";
import {MakeProps} from "../../interfaces";
import {IsColor, IsSize} from "../../props";
import {ConfigFactory} from "../../utils";

export type TabSize = "normal" | "medium" | "large";
export type TagColors = "black" | "dark" | "light" | "white" | "primary" | "link" | "info" | "success" | "warning"
    | "danger";

export interface ITag extends IsColor<TagColors>, IsSize<TabSize> {
    rounded?: boolean;
    delete?: boolean;
}

const config = ConfigFactory.create({component: "tag"});
export const Tag = config.factory<MakeProps<ITag>>(({props, children, options}) => (
    options.delete ? <a {...props}/> : <span {...props}>{children}</span>
));
