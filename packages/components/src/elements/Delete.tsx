import * as React from "react";
import {Size} from "../enum";
import {Helpers} from "../helpers";
import {MakeProps} from "../interfaces";

export type DeleteProps = MakeProps<{ size?: Size }>;
export const Delete: React.FunctionComponent<DeleteProps> = (props) => {
    return <a className={Helpers.calcClasses(props, {name: "delete", is: ["size"]})}>{props.children}</a>;
};
