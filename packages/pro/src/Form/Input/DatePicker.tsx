import * as React from "react";
import {Input} from "./Input";

export type DatePickerValue = Date | number | string;

export interface IDatePicker {
    min?: DatePickerValue;
    max?: DatePickerValue;
}

export class DatePicker<P = {}> extends Input<P & IDatePicker, DatePickerValue> {
    protected type = "date";

    protected get initialValue(): any {
        return undefined;
    }

    public parse(value?: string) {
        if (value && typeof value !== "undefined") {
            return new Date(value + " 23:59:59.999");
        }

        return undefined;
    }

    public serialize(value?: DatePickerValue) {
        if (value && value instanceof Date) {
            return value.toISOString()
                .substr(0, 10);
        }

        return value ?
            new Date(value)
                .toISOString()
                .substr(0, 10)
            : "";
    }

    public validate(value: DatePickerValue, required: boolean) {
        if (!super.validate(value, required)) {
            return false;
        }

        if (value) {
            if (new Date(value).toString() === "Invalid Date") {
                return false;
            }

            if (this.props.min && new Date(value) < new Date(this.props.min!)) {
                return false;
            }

            if (this.props.max && new Date(value) > new Date(this.props.max!)) {
                return false;
            }
        }

        return true;
    }
}
