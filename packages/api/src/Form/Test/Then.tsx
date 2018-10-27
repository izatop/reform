import * as React from "react";
import {TestContext} from "../../Context";

export const Then: React.StatelessComponent = (props) => (
    <TestContext.Consumer>
        {(value) => value ? props.children : null}
    </TestContext.Consumer>
);
