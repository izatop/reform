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
        if (typeof value !== "undefined") {
            const precision = this.props.precision || 0;
            if (precision > 0 && /^-?\d+((,|.)\d+)?$/.test(value)) {
                return round(+value, this.props.precision);
            }

            if (/^-?\d+$/.test(value)) {
                return round(+value, 0);
            }
        }

        return value;
    }

    public serialize(value?: number) {
        return typeof value !== "undefined" ? value.toString() : "";
    }

    public validate(value: number | any, required: boolean) {
        if (typeof value !== "number" || isNaN(+value) || Number.MAX_SAFE_INTEGER < +value) {
            return false;
        }

        if (!super.validate(value, required)) {
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
