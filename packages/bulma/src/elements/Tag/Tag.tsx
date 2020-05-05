import * as React from "react";
import {IsColor, IsSize} from "../../props";
import {MakeProps} from "../../type";
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
