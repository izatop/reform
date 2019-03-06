import React from "react";
import {calcClasses} from "../../helpers";
import {MakeProps} from "../../interfaces";

const options = {name: "media-left"};
export type MediaLeftProps = MakeProps;
export const MediaLeft: React.FunctionComponent<MediaLeftProps> = (props) => (
    <figure className={calcClasses(props, options)}>{props.children}</figure>
);
