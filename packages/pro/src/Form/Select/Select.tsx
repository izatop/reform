import {Select as SelectComponent, SelectOptionType} from "@reform/components";
import * as React from "react";
import {AbstractControl} from "../AbstractControl";

export interface ISelect {
    options: SelectOptionType[];
}

export class Select<P = {}> extends AbstractControl<string | number, P & ISelect> {
    protected get defaultValue() {
        if (!this.props.options.length) {
            return;
        }

        const [value] = [...this.props.options].slice(0, 1);

        if (typeof value === "object") {
            return value.value;
        }

        return value;
    }

    public render() {
        return (
            <SelectComponent {...this.getControlProps()}
                             onChange={this.onChange}
                             options={this.props.options}/>
        );
    }

    protected onChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        this.update(e.currentTarget.value);
    }
}
