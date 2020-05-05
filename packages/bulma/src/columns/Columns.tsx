import * as React from "react";
import {MakeBreakpoint, MakeResponsive, XProps} from "../interfaces";
import {ConfigFactory} from "../utils";

export type Gap = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;

export interface IColumns {
    gap?: false | Gap | number;
    centered?: boolean;
    vCentered?: boolean;
}

export type ColumnsProps = MakeBreakpoint<IColumns> & MakeResponsive<IColumns, "gap">;
export type ColumnsType = React.FC<XProps<"div"> & ColumnsProps>;

const config = ConfigFactory.create({
    component: "columns",
    resolvers: {gap: (v: boolean | Gap) => v === false ? "is-gapless" : `is-${v}`},
    mutations: {gap: "is-variable"},
});

export const Columns: ColumnsType = config.factory<ColumnsProps, XProps<"div">>(({props, children}) => (
    <div {...props}>{children}</div>
));
