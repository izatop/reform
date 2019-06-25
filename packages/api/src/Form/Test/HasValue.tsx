import * as React from "react";
import {Receiver} from "../../Context";

export interface IHasValue {
    name: string;
    validator?: (value: any) => boolean;
}

export class HasValue extends Receiver<IHasValue> {
    public static defaultProps = {
        validator: (value: any) => typeof value !== "undefined",
    };

    public render() {
        return this.props.validator!(this.context.resolve(name)) ? this.props.children : null;
    }
}
