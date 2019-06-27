import * as React from "react";
import {IterableContext, Receiver} from "../../Context";
import {ElementIterable} from "../../Store";

export interface IListProps {
    name: string;
    required?: boolean;
    defaultValue?: any[];
}

export type ListContextType = (data: ElementIterable) => React.ReactNode;

export class List<P = {}> extends Receiver<P & IListProps> {
    protected iterator!: ElementIterable;

    constructor(props: any, context: any) {
        super(props, context);

        this.iterator = this.context.mountArray(
            this.props.name,
            {
                initialValue: [],
                required: this.props.required,
                defaultValue: this.props.defaultValue,
                validate: (value: any[], required?: boolean) => {
                    return Array.isArray(value)
                        && (!required || value.length > 0);
                },
                compare: (initial, value) => initial === value,
            },
        );
    }

    public componentDidMount() {
        super.componentDidMount();
        this.iterator.listen(() => {
            this.context.compute();
        });
    }

    public render() {
        return (
            <IterableContext.Provider key={this.context.version} value={this.iterator}>
                {this.props.children}
            </IterableContext.Provider>
        );
    }
}
