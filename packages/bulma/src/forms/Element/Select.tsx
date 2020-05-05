import * as React from "react";
import {MakeProps, XProps} from "../../interfaces";
import {IsColor, IsSize} from "../../props";
import {ConfigFactory} from "../../utils";

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

export interface ISelect extends IsSize, IsColor {
    loading?: boolean;
    hovered?: boolean;
    focused?: boolean;
    rounded?: boolean;
    static?: boolean;
    fullwidth?: boolean;
}

export type SelectProps = XProps<"select"> & {
    options: SelectOptionType[];
    emptiness?: string | boolean;
};

const config = ConfigFactory.create({
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

export const Select = config.factoryRef<"select", MakeProps<ISelect>, SelectProps>(({props}) => {
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
