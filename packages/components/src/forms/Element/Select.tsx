import * as React from "react";
import {XProps} from "../../interfaces";
import {ColorType, SizeType} from "../../options";
import {MakeProps} from "../../type";
import {ElementFactory} from "../../utils";

export enum SelectState {
    Hover = "hovered",
    Focus = "focused",
    Load = "loading",
}

export type SelectStateType = SelectState | "hovered" | "focused" | "loading";

export type SelectOptionType = string
    | number
    | { key?: string | number, value: string | number, label: string | number };

const mapOptionToSelect = (value: SelectOptionType, key?: number | string) => {
    if (typeof value === "object") {
        return <option key={value.key || value.value || key} value={value.value}>{value.label}</option>;
    }

    return <option key={`${key}-${value}`}>{value}</option>;
};

export interface ISelect {
    "is-rounded"?: boolean;
    "is-static"?: boolean;
    "is-loading"?: boolean;
    "is-color"?: ColorType;
    "is-size"?: SizeType;
    "is-state"?: SelectStateType;
}

export type SelectProps = XProps<"select"> & {
    options: SelectOptionType[];
};

const config = ElementFactory.create({
    component: "select",
    mutations: {multiple: "is-multiple"},
});

export const Select = config.factory<MakeProps<ISelect>, SelectProps>(({props, ...s}) => {
    const {className, options, ...p} = props;
    return (
        <div className={className}>
            <select {...p}>
                {options.map(mapOptionToSelect)}
            </select>
        </div>
    );
});
