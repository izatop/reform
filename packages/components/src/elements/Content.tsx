import React from "react";
import {Helpers} from "../helpers";
import {Size} from "../enum";
import {MakeProps} from "../interfaces";

const options = {name: "content", is: ["size"]};

export type ContentProps = MakeProps<{
    size?: Size;
    children: React.ReactNode | React.ReactNode[];
}>;

export const Content: React.FunctionComponent<ContentProps> = (props) => (
    <div className={Helpers.calcClasses(props, options)}>{props.children}</div>
);
