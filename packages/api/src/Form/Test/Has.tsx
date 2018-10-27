import * as React from "react";
import {Receiver, TestContext} from "../../Context";

export class Has extends Receiver<{name: string}> {
    public render() {
        if (this.store.has(this.props.name)) {
            const {Provider} = TestContext;
            return (
                <Provider value={true}>{this.props.children}</Provider>
            );
        }

        return null;
    }
}
