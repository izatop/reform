import * as React from "react";
import {MakeProps} from "../../../interfaces";

/**
 * @private
 * @param type
 */
export const resolveAlign = (type: string) => (value: boolean | FieldAlign) => {
    if (value === true) {
        return type;
    }

    if (typeof value === "string") {
        return [type, `${type}-${value}`];
    }
};

export type FieldAlign = "centered" | "right";

export interface IFieldProps<T = React.ReactElement> extends MakeProps {
    children: React.ReactElement | [React.ReactElement, ...React.ReactElement[]];
    addons?: boolean | FieldAlign;
    group?: boolean | FieldAlign | "multiline";
    horizontal?: boolean;
}

export const FieldOptions = {
    name: "field",
    has: [{addons: resolveAlign("addons")}],
    is: ["horizontal", {group: resolveAlign("grouped")}],
};
