import {Select as SelectComponent, SelectOptionType} from "@reform/components";
import * as React from "react";
import {AbstractControl} from "../AbstractControl";

export interface IMultipleSelect {
    options: SelectOptionType[];
    size?: number;
}

export abstract class MultipleSelect<P = {}> extends AbstractControl<Array<string | number>, P & IMultipleSelect> {
    protected get defaultValue() {
        return [];
    }

    public render() {
        return (
            <SelectComponent {...this.getControlProps()}
                             onChange={this.onChange}
                             multiple={true}
                             size={this.props.size}
                             options={this.props.options}/>
        );
    }

    private onChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        this.update(
            [...e.currentTarget.selectedOptions].map((option) => option.value),
        );
    }
}
