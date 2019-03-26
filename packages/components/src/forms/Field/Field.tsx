import * as React from "react";
import {XProps} from "../../interfaces";
import {ElementFactory} from "../../utils";

export interface IField {
    "is-grouped"?: boolean | "centered" | "right" | "multiline";
    "has-addons"?: boolean | "centered" | "right";
}

export type FieldProps = XProps<"div"> & {
    children: React.ReactElement | [React.ReactElement, ...React.ReactElement[]];
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
