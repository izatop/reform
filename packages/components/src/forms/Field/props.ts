import * as React from "react";
import {Align} from "../../enum";
import {MakeProps} from "../../interfaces";

/**
 * @private
 * @param type
 */
export const resolveAlign = (type: string) => (value: boolean | Align) => {
    if (value === true) {
        return type;
    }

    if (typeof value === "string") {
        return [type, `${type}-${value}`];
    }
};

export interface IFieldProps<T = React.ReactElement> extends MakeProps {
    children: React.ReactElement | [React.ReactElement, ...React.ReactElement[]];
    addons?: boolean | Align;
    group?: boolean | Align | "multiline";
    label?: string;
    help?: string;
}

export const FieldOptions = {
    name: "field",
    has: [{addons: resolveAlign("addons")}],
    is: ["horizontal", {group: resolveAlign("grouped")}],
};
