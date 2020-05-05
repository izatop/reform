import * as React from "react";
import * as renderer from "react-test-renderer";
import {NonIdealState} from "../../src/Accesibility";

test("Non ideal state", () => {
    expect(renderer.create(<NonIdealState icon={"home"} title={"Ooops..."}/>).toJSON())
        .toMatchSnapshot();
});
