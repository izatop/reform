import * as React from "react";
import {Color, Size} from "../../enum";
import {Helpers} from "../../helpers";
import {MakeProps} from "../../interfaces";

export enum SelectStyle {
    Round = "rounded",
    Static = "static",
}

export enum SelectState {
    Hover = "hovered",
    Focus = "focused",
    Load = "loading",
}

export type SelectProps = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLSelectElement>,
    HTMLSelectElement>;

export type SelectOptionType = string
    | number
    | { key?: string | number, value: string | number, label: string | number };

export interface ISelectProps extends MakeProps {
    props?: SelectProps;
    size?: Size;
    color?: Color;
    style?: SelectStyle;
    state?: SelectState;
    disabled?: boolean;
    multiple?: boolean | number;
    options: SelectOptionType[];
}

const SelectOptions = {
    name: "select",
    is: ["size", "color", "style", {multiple: () => "multiple"}],
};

const mapOptionToSelect = (value: SelectOptionType, key?: number | string) => {
    if (typeof value === "object") {
        return <option key={value.key || value.value || key} value={value.value}>{value.label}</option>;
    }

    return <option key={`${key}-${value}`}>{value}</option>;
};

export const Select: React.FC<ISelectProps> = (props) => (
    <div className={Helpers.calcClasses(props, SelectOptions)}>
        <select disabled={props.disabled}
                multiple={!!props.multiple}
                size={typeof props.multiple === "number" ? props.multiple : undefined}
                {...Helpers.calcProps(props, {})}>
            {props.options.map(mapOptionToSelect)}
        </select>
    </div>
);
