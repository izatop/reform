import * as React from "react";
import * as renderer from "react-test-renderer";
import {Node} from "../../src/elements/Node";

test("Node", () => {
    const div = renderer.create(<Node as={"div"} textAlign={"centered"} textSize={6} className={"foo"}>Text</Node>);
    expect(div.toJSON()).toMatchSnapshot();

    const span = renderer.create(<Node as={"span"} textAlign={"centered"} textSize={6} className={"foo"}>Text</Node>);
    expect(span.toJSON()).toMatchSnapshot();
});
