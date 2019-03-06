import React from "react";
import {calcClasses} from "../../helpers";
import {MakeBreakpointProps} from "../../interfaces";

const options = {name: "media"};
export type MediaProps = MakeBreakpointProps;
export const Media: React.FunctionComponent<MediaProps> = (props) => (
    <article className={calcClasses(props, options)}>{props.children}</article>
);
