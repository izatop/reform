import * as React from "react";
import {Helpers} from "../../helpers";
import {MakeProps} from "../../interfaces";

export interface IFieldHelpProps extends MakeProps {
    children: string;
}

export const FieldHelp: React.FC<IFieldHelpProps> = (props) => (
    <p className={Helpers.calcClasses(props, {name: "help"})}>{props.children}</p>
);
