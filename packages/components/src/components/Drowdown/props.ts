import {ReactElement} from "react";
import {MakeProps} from "../../interfaces";

export const DropdownOptions = {
    name: "dropdown",
    is: ["active", "hoverable", "up", {right: (v: boolean) => v ? "right" : undefined}],
};

export type DropdownProps = MakeProps<{
    hoverable?: boolean;
    defaultActive?: boolean;
    mouseLeaveTimeout?: number;
    onChange?: (status: boolean) => void;
    right?: boolean;
    button: string | ReactElement;
    up?: boolean;
}>;

export const DropdownElementOptions = {
    name: "dropdown-item",
    is: ["active"],
};

export type DropdownElementProps = MakeProps<{
    children: ReactElement;
    active?: boolean;
}>;

export const DropdownDividerOptions = {
    name: "dropdown-divider",
};

export type DropdownDividerProps = MakeProps;
