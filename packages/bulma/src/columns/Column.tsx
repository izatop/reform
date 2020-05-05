import React from "react";
import {XProps} from "../interfaces";
import {MakeProps} from "../type";
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

export interface IColumnProps extends XProps<"div"> {}

const config = ConfigFactory.create({
    component: "column",
    resolvers: {
        size: (v) => `is-${v}`,
        offset: (v) => `is-offset-${v}`,
    },
});

export const Column = config.factory<MakeProps<IColumn, "size" | "narrow">, IColumnProps>(({props, children}) => (
    <div {...props}>{children}</div>
));
