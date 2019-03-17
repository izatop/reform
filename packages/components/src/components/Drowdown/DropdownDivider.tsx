import * as React from "react";
import {Helpers} from "../../helpers";
import {DropdownDividerOptions, DropdownDividerProps} from "./props";

export const DropdownDivider: React.FunctionComponent<DropdownDividerProps> = (props) => (
    <hr className={Helpers.calcClasses(props, DropdownDividerOptions)}/>
);

DropdownDivider.displayName = "DropdownDivider";
