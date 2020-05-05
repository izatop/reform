import * as React from "react";
import * as renderer from "react-test-renderer";
import {Div} from "../../src/elements/Div";

test("Div", () => {
    const div = renderer.create(<Div textAlign={"centered"} textSize={6} className={"foo"}>Text</Div>);
    expect(div.toJSON()).toMatchSnapshot();
});
