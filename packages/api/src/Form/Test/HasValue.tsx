import * as React from "react";
import {Receiver, TestContext} from "../../Context";

export class HasValue extends Receiver<{ name: string }> {
    public render() {
        const {Provider} = TestContext;
        const hasValue = this.context.resolve(name) === "undefined";
        return (
            <Provider value={hasValue}>{this.props.children}</Provider>
        );
    }
}
