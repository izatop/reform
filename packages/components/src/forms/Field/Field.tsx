import * as React from "react";
import {Helpers} from "../../helpers";
import {FieldHelp} from "./FieldHelp";
import {Label} from "./Label";
import {FieldOptions, IFieldProps} from "./props";

export const Field: React.FC<IFieldProps> = (props) => (
    <div className={Helpers.calcClasses(props, FieldOptions)}>
        {props.label && <Label>{props.label}</Label>}
        {props.children}
        {props.help && <FieldHelp>{props.help}</FieldHelp>}
    </div>
);
