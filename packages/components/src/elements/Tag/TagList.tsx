import * as React from "react";
import {Helpers} from "../../helpers";
import {Color} from "../../enum";
import {MakeProps} from "../../interfaces";
import {TagSize} from "./";

export type TagListProps = MakeProps<{
    size?: TagSize;
    addons?: boolean;
}>;

export const TagListOptions = {
    name: "tags",
    are: ["size"],
    has: ["addons"],
};

export const TagList: React.FunctionComponent<TagListProps> = (props) => (
    <span className={Helpers.calcClasses(props, TagListOptions)}>{props.children}</span>
);
