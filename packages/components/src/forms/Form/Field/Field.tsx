import * as React from "react";
import {FieldHorizontal} from "./FieldHorizontal";
import {FieldVertical} from "./FieldVertical";
import {IFieldProps} from "./props";

export const Field: React.FC<IFieldProps> = (props) => (
    props.horizontal
        ? <FieldHorizontal {...props}>{props.children}</FieldHorizontal>
        : <FieldVertical {...props}>{props.children}</FieldVertical>
);
