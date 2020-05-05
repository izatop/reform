import * as React from "react";
import * as renderer from "react-test-renderer";
import {Delete} from "../../src/elements";

test("Delete", () => {
    const div = renderer.create(<Delete size={"small"}/>);
    expect(div.toJSON()).toMatchSnapshot();
});
