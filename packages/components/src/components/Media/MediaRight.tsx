import React from "react";
import {Helpers} from "../../helpers";
import {MakeProps} from "../../interfaces";

const options = {name: "media-right"};
export type MediaRightProps = MakeProps;
export const MediaRight: React.FunctionComponent<MediaRightProps> = (props) => (
    <div className={Helpers.calcClasses(props, options)}>{props.children}</div>
);

MediaRight.displayName = "MediaRight";
