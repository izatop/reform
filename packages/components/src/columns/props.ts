import {TextSize} from "../enum";
import {MakeBreakpointProps, MakeProps, MakeResponsive} from "../interfaces";

export enum ColumnType {
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

export enum ColumnsCentered {
    Horizontal = "centered",
    Vertical = "vcentered",
}

export type ColumnSpan = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;
export type ColumnsGap = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;

export interface IColumns {
    gap?: false | TextSize;
    multiline?: boolean;
    centered?: boolean | ColumnsCentered | ColumnsCentered[];
}

export type ColumnsProps = MakeBreakpointProps<IColumns>;
export const ColumnsOptions = {
    name: "columns",
    is: [
        "multiline",
        "centered",
        {
            center: (v: ColumnsCentered) => v,
            gap: (v: boolean | ColumnsGap) => v === false ? "gapless" : v.toString(),
        },
    ],
};

export interface IColumn {
    size?: TextSize;
    offset?: TextSize;
    span?: ColumnSpan | ColumnType;
    narrow?: true;
}

export type ColumnProps = MakeProps<MakeResponsive<IColumn, "size" | "span" | "offset">>;
export const ColumnOptions = {
    name: "column",
    is: [
        "size",
        "narrow",
        {
            offset: (v: ColumnType) => v.toString(),
            span: (v: ColumnSpan | ColumnType) => v.toString(),
        },
    ],
    responsive: true,
};
