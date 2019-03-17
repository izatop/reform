import * as React from "react";
import {Helpers} from "../../helpers";
import {FieldOptions, IFieldProps} from "./props";

const LabelOptions = {
    name: "field-label",
    is: ["size"],
};

export type HorizontalProps = IFieldProps<[React.ReactElement, ...React.ReactElement[]]>;

export const Horizontal: React.FC<HorizontalProps> = (props) => {
    const [label, ...children] = React.Children.toArray<React.ReactElement>(props.children);
    return (
        <div className={Helpers.calcClasses(props, FieldOptions)}>
            <div className={Helpers.calcClasses(label.props, LabelOptions)}>
                {React.cloneElement(label, {})}
            </div>
            <div className={"field-body"}>{children}</div>
        </div>
    );
};

Horizontal.displayName = "Horizontal";
