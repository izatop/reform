import * as React from "react";
import {calcClasses} from "../../helpers";
import {DropdownDividerOptions, DropdownDividerProps} from "./props";

export const DropdownDivider: React.FunctionComponent<DropdownDividerProps> = (props) => (
    <hr className={calcClasses(props, DropdownDividerOptions)}/>
);
