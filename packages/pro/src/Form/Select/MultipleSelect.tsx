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
        const props = this.createProps<HTMLSelectElement>({
            onChange: (e) => this.update(
                [...e.target.selectedOptions].map((option) => option.value),
            ),
        });

        return (
            <SelectComponent {...this.getControlProps()}
                             multiple={this.props.size || true}
                             options={this.props.options}
                             props={props}/>
        );
    }
}
