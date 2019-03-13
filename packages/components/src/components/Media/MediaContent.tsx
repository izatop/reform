import React from "react";
import {Helpers} from "../../helpers";
import {MakeProps} from "../../interfaces";

const options = {name: "media-left"};
export type MediaContentProps = MakeProps;
export const MediaContent: React.FunctionComponent<MediaContentProps> = (props) => (
    <figure className={Helpers.calcClasses(props, options)}>{props.children}</figure>
);
