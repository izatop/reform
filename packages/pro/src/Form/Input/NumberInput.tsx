import * as React from "react";
import {Input} from "./Input";

export interface INumberInput {
    min?: number;
    max?: number;
    precision?: number;
}

function round(n: number, p = 0) {
    if (p > 0) {
        return Math.round(n * Math.pow(10, p) + Number.EPSILON) / Math.pow(10, p);
    }

    return Math.round(n);
}

export class NumberInput<P = {}> extends Input<P & INumberInput> {
    protected type: string = "text";

    protected get initialValue(): any {
        return undefined;
    }

    public parse(value?: string) {
        if (typeof value === "string" && value.length > 0) {
            const precision = this.props.precision || 0;
            if (precision > 0 && /^-?\d+(,|.)\d*[1-9]+$/.test(value)) {
                return round(+value.replace(",", "."), this.props.precision);
            }

            if (!precision && /^-?\d+$/.test(value)) {
                return round(+value, 0);
            }

            return value;
        }

        return undefined;
    }

    public serialize(value?: number | string) {
        if (typeof value === "string") {
            return value;
        }

        return typeof value === "number" ? value.toString() : "";
    }

    public validate(value: number | string, required: boolean) {
        if (!super.validate(value, required)) {
            return false;
        }

        if (!required && !value) {
            return true;
        }

        if (isNaN(+value) || Number.MAX_SAFE_INTEGER < +value) {
            return false;
        }

        return !(
            (this.props.max && this.props.max < value)
            || (this.props.min && this.props.min > value)
        );
    }

    protected getControlProps() {
        return {
            ...super.getControlProps(),
            max: this.props.max,
            min: this.props.min,
        };
    }
}

/**
 * @deprecated
 */
export const Numeric = NumberInput;
