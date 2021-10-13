import * as React from "react";
import * as renderer from "react-test-renderer";
import {Column} from "../../../src/columns";

test("Column", () => {
    expect(renderer.create(<Column/>).toJSON()).toMatchSnapshot();
    expect(renderer.create(<Column size={1}/>).toJSON()).toMatchSnapshot();
    expect(renderer.create(<Column size={1} narrow>Content</Column>).toJSON()).toMatchSnapshot();
});
