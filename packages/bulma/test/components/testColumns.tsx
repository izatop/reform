import * as React from "react";
import * as renderer from "react-test-renderer";
import {Columns} from "../../src";

test("Columns", () => {
    const columns1 = renderer.create((
        <Columns is-gap={false} is-breakpoint={"fullhd"}/>
    ));

    const columns2 = renderer.create((
        <Columns is-gap={8} x-mobile={{"is-gap": 1}}/>
    ));

    expect(columns2.toJSON()).toMatchSnapshot();
    expect(columns1.toJSON()).toMatchSnapshot();
});
