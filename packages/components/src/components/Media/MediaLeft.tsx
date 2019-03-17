import React from "react";
import {Helpers} from "../../helpers";
import {MakeProps} from "../../interfaces";

const options = {name: "media-left"};
export type MediaLeftProps = MakeProps;
export const MediaLeft: React.FunctionComponent<MediaLeftProps> = (props) => (
    <figure className={Helpers.calcClasses(props, options)}>{props.children}</figure>
);

MediaLeft.displayName = "MediaLeft";
