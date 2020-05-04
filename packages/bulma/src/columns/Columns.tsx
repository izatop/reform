import React from "react";
import {XProps} from "../interfaces";
import {MakeBreakpoint} from "../type";
import {ElementFactory} from "../utils";

export type Gap = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;

export interface IColumns {
    "is-gap"?: false | Gap;
    "is-multiline"?: boolean;
    "is-centered"?: boolean;
    "is-vcentered"?: boolean;
}

const config = ElementFactory.create({
    component: "columns",
    resolvers: {
        gap: (v: boolean | Gap) => v === false ? "gapless" : v.toString(),
    },
});

export const Columns = config.factory<MakeBreakpoint<IColumns, "is-gap">, XProps<"div">>(({props, children}) => (
    <div {...props}>{children}</div>
));
