import * as React from "react";
import {Helpers} from "../../../helpers";
import {FieldOptions, IFieldProps} from "./props";

export const FieldVertical: React.FC<IFieldProps> = (props) => (
    <div className={Helpers.calcClasses(props, FieldOptions)}>{props.children}</div>
);
