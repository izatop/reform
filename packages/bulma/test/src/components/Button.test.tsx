import * as React from "react";
import * as renderer from "react-test-renderer";
import {Button, Size} from "../../../src";

test("Button", () => {
    const element1 = renderer.create((<Button size={Size.Small} loading/>));
    expect(element1.toJSON()).toMatchSnapshot();
});
