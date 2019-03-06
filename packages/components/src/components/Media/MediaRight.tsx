import React from "react";
import {calcClasses} from "../../helpers";
import {MakeProps} from "../../interfaces";

const options = {name: "media-right"};
export type MediaRightProps = MakeProps;
export const MediaRight: React.FunctionComponent<MediaRightProps> = (props) => (
    <div className={calcClasses(props, options)}>{props.children}</div>
);
