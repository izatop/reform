import * as React from "react";
import {Input} from "./Input";

export interface INumberInput {
    min?: number;
    max?: number;
}

export class Numeric<P = {}> extends Input<P & INumberInput> {
    protected type: string = "number";

    protected get initialValue() {
        return undefined as any;
    }

    public parse(value?: string) {
        if (typeof value === "string" && value.length > 0) {
            return Number(value);
        }

        return undefined;
    }

    public serialize(value?: number) {
        return value ? value.toString() : "";
    }

    public validate(value: number) {
        if (!super.validate(value)) {
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
