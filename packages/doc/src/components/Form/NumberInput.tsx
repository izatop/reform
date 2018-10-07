/* @id NumberInput.tsx */

import {receiver} from "@reform/api";
import * as React from "react";
import {BaseInput} from "./BaseInput";

export interface INumberInputProps {
    min?: number;
    max?: number;
}

export class NumberInputComponent extends BaseInput<number, INumberInputProps> {
    protected type = "number";

    public parse(value?: string) {
        if (typeof value === "string" && value.length > 0) {
            return Number(value);
        }
    }

    public serialize(value?: number) {
        return value ? value.toString() : "";
    }

    public validate(value: number) {
        if (!(super.validate(value)
            && typeof value === "number"
            && value === value)) {
            return false;
        }

        if (this.props.min && this.props.min > value) {
            return false;
        }

        return !(this.props.max && this.props.max < value);
    }

    protected getDefaultInputProps() {
        return {
            ...super.getDefaultInputProps(),
            max: this.props.max,
            min: this.props.min,
        }
    }
}

export const NumberInput = receiver(NumberInputComponent);
