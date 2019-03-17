import React from "react";
import {Align, Size} from "../enum";
import {Helpers} from "../helpers";
import {MakeProps} from "../interfaces";

const options = {
    name: "content",
    is: ["size"],
    has: [{align: (v: string) => `text-${v}`}],
};

export type ContentProps = MakeProps<{
    size?: Size;
    children: React.ReactNode | React.ReactNode[];
    align?: Align;
}>;

export const Content: React.FunctionComponent<ContentProps> = (props) => (
    <div className={Helpers.calcClasses(props, options)}>{props.children}</div>
);
