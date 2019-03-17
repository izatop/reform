import * as React from "react";
import {Helpers} from "../../helpers";
import {Color} from "../../enum";
import {MakeProps} from "../../interfaces";

export enum TagSize {
    Normal = "normal",
    Medium = "medium",
    Large = "large",
}

export type TagProps = MakeProps<{
    color?: Color;
    size?: TagSize;
    rounded?: boolean;
    delete?: boolean;
}>;

export const TagOptions = {
    name: "tag",
    is: ["color", "size", "rounded", "delete"],
};

export const Tag: React.FunctionComponent<TagProps> = (props) => (
    props.delete
        ? <a className={Helpers.calcClasses(props, TagOptions)} />
        : <span className={Helpers.calcClasses(props, TagOptions)}>{props.children}</span>
);

Tag.displayName = "Tag";
