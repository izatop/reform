import * as React from "react";
import * as renderer from "react-test-renderer";
import {Column} from "../../src/columns";

test("Column", () => {
    expect(renderer.create(<Column/>).toJSON()).toMatchSnapshot();
    expect(renderer.create(<Column is-size={1}/>).toJSON()).toMatchSnapshot();
    expect(renderer.create(<Column is-size={1} is-narrow>Content</Column>).toJSON()).toMatchSnapshot();
});
