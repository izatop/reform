import React from "react";
import {MakeProps} from "../type";
import {ElementFactory} from "../utils";

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
    "is-offset"?: ColumnSize | ColumnName | string;
    "is-size"?: ColumnSize | ColumnName | string;
    "is-narrow"?: true;
}

const config = ElementFactory.create({component: "column"});

export const Column = config.factory<MakeProps<IColumn, "is-size">>(({props, children}) => (
    <div {...props}>{children}</div>
));
