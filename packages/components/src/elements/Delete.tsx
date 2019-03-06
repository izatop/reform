import * as React from "react";
import {Size} from "../enum";
import {calcClasses} from "../helpers";
import {MakeProps} from "../interfaces";

export type DeleteProps = MakeProps<{ size?: Size }>;
export const Delete: React.FunctionComponent<DeleteProps> = (props) => {
    return <a className={calcClasses(props, {name: "delete", is: ["size"]})}>{props.children}</a>;
};
