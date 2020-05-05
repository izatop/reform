import * as React from "react";
import {MakeProps, MakeResponsive, XProps} from "../interfaces";
import {ConfigFactory} from "../utils";

export enum ColumnName {
    ThreeQuarters = "three-quarters",
    TwoThirds = "two-thirds",
    Half = "half",
    OneThird = "one-third",
    OneQuarter = "one-quarter",
    Full = "full",
    FourFifths = "four-fifths",
    ThreeFifths = "three-fifths",
    TwoFifths = "two-fifths",
    OneFifth = "one-fifth",
}

export type ColumnSize = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;

export interface IColumn {
    offset?: ColumnSize | ColumnName | string;
    size?: ColumnSize | ColumnName | string;
    narrow?: boolean;
}

export type ColumnProps = MakeProps<IColumn> & MakeResponsive<IColumn, "size" | "narrow">;
export type ColumnType = React.FC<XProps<"div"> & ColumnProps>;

const config = ConfigFactory.create({
    component: "column",
    resolvers: {
        size: (v) => `is-${v}`,
        offset: (v) => `is-offset-${v}`,
    },
});

export const Column: ColumnType = config.factory<ColumnProps, XProps<"div">>(({props, children}) => (
    <div {...props}>{children}</div>
));
