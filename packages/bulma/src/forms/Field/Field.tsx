import * as React from "react";
import {XProps} from "../../interfaces";
import {ElementFactory} from "../../utils";

export interface IField {
    grouped?: boolean | "centered" | "right" | "multiline";
    addons?: boolean | "centered" | "right";
}

export type ElementOrExp = React.ReactElement | false;

export type FieldProps = XProps<"div"> & {
    children: ElementOrExp | [ElementOrExp, ...ElementOrExp[]];
};

const config = ElementFactory.create({
    component: "field",
    resolvers: {
        addons: (v) => typeof v === "string" ? ["has-addons", `has-addons-${v}`] : "has-addons",
        grouped: (v) => typeof v === "string" ? ["is-grouped", `is-grouped-${v}`] : "is-grouped",
    },
});

export const Field = config.factory<IField, FieldProps>(({props, children}) => (
    <div {...props}>
        {children}
    </div>
));
