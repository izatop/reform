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
    | undefined
    | { key?: string | number, value?: string | number, label: string | number };

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
    "is-fullwidth"?: boolean;
}

export type SelectProps = XProps<"select"> & {
    options: SelectOptionType[];
    emptiness?: string | boolean;
};

const config = ElementFactory.create({
    component: "select",
    mutations: {multiple: "is-multiple"},
});

const getOptions = (options: SelectOptionType[], emptiness?: string | boolean) => {
    if (!!emptiness) {
        return [
            typeof emptiness === "string" ? {label: emptiness} : undefined,
            ...options,
        ];
    }

    return options;
};

export const Select = config.factory<MakeProps<ISelect>, SelectProps>(({props}) => {
    const {className, options, emptiness, ...p} = props;
    const optimizedOptions = React.useMemo(() => getOptions(options, emptiness), [options, emptiness]);
    return (
        <div className={className}>
            <select {...p}>
                {optimizedOptions.map(mapOptionToSelect)}
            </select>
        </div>
    );
});
