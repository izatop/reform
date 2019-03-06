import React from "react";
import {calcClasses} from "../helpers";
import {Size} from "../enum";
import {MakeProps} from "../interfaces";

const options = {name: "content", is: ["size"]};

export type ContentProps = MakeProps<{
    size?: Size;
    children: React.ReactNode | React.ReactNode[];
}>;

export const Content: React.FunctionComponent<ContentProps> = (props) => (
    <div className={calcClasses(props, options)}>{props.children}</div>
);
