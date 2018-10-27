import * as React from "react";
import {TestContext} from "../../Context";

export const Not: React.StatelessComponent = (props) => (
    <TestContext.Consumer>
        {(value) => !value ? props.children : null}
    </TestContext.Consumer>
);
