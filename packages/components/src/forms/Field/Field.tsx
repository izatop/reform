import * as React from "react";
import {XProps} from "../../interfaces";
import {ElementFactory} from "../../utils";

export interface IField {
    "is-grouped"?: boolean | "centered" | "right" | "multiline";
    "has-addons"?: boolean | "centered" | "right";
}

export type ElementOrExp = React.ReactElement | false;

export type FieldProps = XProps<"div"> & {
    children: ElementOrExp | [ElementOrExp, ...ElementOrExp[]];
};

const config = ElementFactory.create({
    component: "field",
    resolvers: {
        addons: (v) => typeof v === "string" ? ["addons", `addons-${v}`] : v,
        grouped: (v) => typeof v === "string" ? ["grouped", `grouped-${v}`] : v,
    },
});

export const Field = config.factory<IField, FieldProps>(({props, children}) => (
    <div {...props}>
        {children}
    </div>
));
