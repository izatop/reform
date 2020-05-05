import React from "react";
import {XProps} from "../interfaces";
import {MakeBreakpoint} from "../type";
import {ConfigFactory} from "../utils";

export type Gap = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;

export interface IColumns {
    gap?: false | Gap;
    centered?: boolean;
    vCentered?: boolean;
}

export interface IColumnsProps extends XProps<"div"> {}

const config = ConfigFactory.create({
    component: "columns",
    resolvers: {gap: (v: boolean | Gap) => v === false || v === 0 ? "is-gapless" : `is-gap-${v}`},
    mutations: {gap: "is-variable"},
});

export const Columns = config.factory<MakeBreakpoint<IColumns, "gap">, IColumnsProps>(({props, children}) => (
    <div {...props}>{children}</div>
));
