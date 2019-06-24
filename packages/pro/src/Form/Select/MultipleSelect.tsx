import {Select as SelectComponent, SelectOptionType} from "@reform/components";
import * as React from "react";
import {AbstractControl} from "../AbstractControl";

export interface IMultipleSelect {
    loading?: boolean;
    options: SelectOptionType[];
    size?: number;
}

export abstract class MultipleSelect<P = {}> extends AbstractControl<Array<string | number>, P & IMultipleSelect> {
    protected get initialValue() {
        return [];
    }

    public compare(initial?: Array<string | number>, value?: Array<string | number>) {
        if (!!initial && initial.length === 0 && !!value && value.length === 0) {
            return true;
        }

        return initial === value;
    }

    public validate(value?: Array<string | number>, required?: boolean) {
        const isEmptyArray = !value || !value.length;
        if (isEmptyArray && !required) {
            return true;
        }

        return Array.isArray(value)
            && value.length > 0
            && value.every((item) => this.validateElement(item));
    }

    public validateElement(value: string | number) {
        return !!value;
    }

    public render() {
        return (
            <SelectComponent {...this.getControlProps()}
                             onChange={this.onChange}
                             multiple={true}
                             value={this.value}
                             size={this.props.size}
                             is-loading={this.props.loading}
                             options={this.props.options}/>
        );
    }

    private onChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        this.update(
            [...e.currentTarget.selectedOptions].map((option) => option.value),
        );
    }
}
