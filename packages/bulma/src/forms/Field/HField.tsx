import * as React from "react";
import {MakeProps, XProps} from "../../interfaces";
import {ConfigFactory} from "../../utils";
import {Field} from "./Field";
import {HLabel} from "./HLabel";

export type HFieldProps = XProps<"div"> & {
    label?: string | React.ReactElement;
    children: React.ReactElement[] | React.ReactElement;
};

const config = ConfigFactory.create({component: "is-horizontal", displayName: "HField"});

export const HField = config.factory<MakeProps, HFieldProps>(({props, children}) => {
    const {label, ...p} = props;
    const elements = React.Children.toArray(children);

    let labelElement: any = label;
    if (elements.length > 0) {
        const firstElement = elements[0];
        if (React.isValidElement(firstElement) && firstElement.type === HLabel) {
            labelElement = elements[0];
            elements.splice(0, 1);
        }
    }

    if (typeof labelElement === "string") {
        labelElement = <HLabel>{labelElement}</HLabel>;
    }

    return (
        <Field {...p}>
            {labelElement}
            <div className={"field-body"}>
                {elements}
            </div>
        </Field>
    );
});
