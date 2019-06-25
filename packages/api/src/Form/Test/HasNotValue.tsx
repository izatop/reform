import * as React from "react";
import {Receiver} from "../../Context";

export interface IHasNotValue {
    name: string;
    validator?: (value: any) => boolean;
}

export class HasNotValue extends Receiver<IHasNotValue> {
    public static defaultProps = {
        validator: (value: any) => typeof value === "undefined",
    };

    public render() {
        return this.props.validator!(this.context.resolve(name)) ? this.props.children : null;
    }
}
