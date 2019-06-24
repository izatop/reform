import {Select as SelectComponent, SelectOptionType} from "@reform/components";
import * as React from "react";
import {AbstractControl} from "../AbstractControl";

export interface ISelect {
    options: SelectOptionType[];
    disabled?: boolean;
    emptiness?: boolean | string;
    loading?: boolean;
}

export class Select<P = {}> extends AbstractControl<string | number, P & ISelect> {
    protected get options() {
        const options = this.props.options.map((option, index) => {
            if (typeof option === "object") {
                return {label: option.label, value: index + 1};
            }

            return {label: option || "", value: index + 1};
        });

        const {emptiness} = this.props;
        return [
            {label: typeof emptiness === "string" ? emptiness : "", value: -1},
            ...options,
        ];
    }

    public validate(value?: string | number, required?: boolean): boolean {
        return !required || typeof value !== "undefined";
    }

    public serialize(value?: string | number): any {
        return this.props.options.findIndex((option) => {
            if (typeof option === "object") {
                return option.value === value;
            }

            return option === value;
        }) + 1;
    }

    public parse(value?: string | number): string | number | undefined {
        if (typeof value !== "undefined" && value !== -1) {
            const option = this.props.options[+value - 1];
            if (typeof option === "object") {
                return option.value;
            }

            return option;
        }

        return;
    }

    public render() {
        return (
            <SelectComponent {...this.getControlProps()}
                             value={this.value}
                             onChange={this.onChange}
                             is-loading={this.props.loading}
                             disabled={this.props.disabled}
                             options={this.options}/>
        );
    }

    protected onChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        this.update(e.currentTarget.value);
    }
}
