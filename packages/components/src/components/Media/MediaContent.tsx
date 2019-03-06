import React from "react";
import {calcClasses} from "../../helpers";
import {MakeProps} from "../../interfaces";

const options = {name: "media-left"};
export type MediaContentProps = MakeProps;
export const MediaContent: React.FunctionComponent<MediaContentProps> = (props) => (
    <figure className={calcClasses(props, options)}>{props.children}</figure>
);
