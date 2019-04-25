import {Element, Receiver} from "@reform/api";
import {Dropdown, DropdownElement, Input} from "@reform/components";
import * as React from "react";

export interface IAutoCompleteValue {
    value: string | number;
    label?: string;
}

export interface IAutoCompleteProps<TValue> {
    name: string;
    placeholder?: string;
    defaultValue?: TValue;
    dataSource: {(search: string): Promise<TValue[]>} | TValue[];
    serialize?: (value: TValue) => string;
}

interface IState<TValue> {
    value?: string;
    values: TValue[];
    active: boolean;
}

export class AutoComplete<TValue = IAutoCompleteValue> extends Receiver<IAutoCompleteProps<TValue>, IState<TValue>> {
    public state: IState<TValue>;

    protected link: Element<object, TValue>;

    constructor(props: IAutoCompleteProps<TValue>, context: any) {
        super(props, context);
        this.link = this.context.mount(
            this.props.name,
            {
                initialValue: undefined,
                defaultValue: this.props.defaultValue,
                validate: () => true,
                compare: (v1, v2) => this.serialize(v1) === this.serialize(v2),
            },
        );

        this.state = {
            active: false,
            values: [],
            value: this.serialize(this.props.defaultValue),
        };
    }

    public componentWillUnmount() {
        super.componentWillUnmount();
        this.context.unmount(this.props.name);
    }

    public render() {
        const {active, values, value} = this.state;
        return (
            <>

                <Dropdown active={active && values.length > 0}
                          button={<Input value={value || ""}
                                         placeholder={this.props.placeholder}
                                         onChange={this.handleChange}
                                         autoComplete={"off"}/>}>
                    {values.map((item, key) => (
                        <DropdownElement key={`${key}-${this.serialize(item)}`}>
                            <a onClick={() => this.handleSelect(item)}>{this.serialize(item)}</a>
                        </DropdownElement>
                    ))}
                </Dropdown>
            </>
        );
    }

    protected disposable = () => {
        this.setState({active: false, value: this.serialize(this.link.value)});
    }

    protected isUserType(value: TValue): value is TValue {
        return !!this.props.serialize;
    }

    protected isDefaultType(value: TValue | IAutoCompleteValue): value is IAutoCompleteValue {
        const keys = Object.keys(value);
        return keys.length === 1 && keys.includes("value")
            || keys.length === 2 && keys.includes("value") && keys.includes("label");
    }

    protected serialize(value?: TValue) {
        if (value && this.isDefaultType(value)) {
            return this.props.serialize ? this.props.serialize(value) : `${value.label || value.value}`;
        }
    }

    private updateSuggestion = async () => {
        const {value} = this.state;
        if (!value) {
            return this.setState({values: []});
        }

        if (typeof this.props.dataSource === "function") {
            return this.setState({values: await this.props.dataSource(value)});
        }

        const search = value.toLowerCase();
        const values = this.props.dataSource.filter((item) => {
            return this.serialize(item)!.toLowerCase().includes(search);
        });

        this.setState({active: true, values});
    }

    private handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({value: e.currentTarget.value}, this.updateSuggestion);
    }

    private handleSelect = (value: TValue) => {
        this.link.update(value);
    }
}
