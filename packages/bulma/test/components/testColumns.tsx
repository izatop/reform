import * as React from "react";
import * as renderer from "react-test-renderer";
import {Columns} from "../../src";

test("Columns", () => {
    const columns1 = renderer.create((<Columns gap={false} breakpoint={"fullhd"}/>));
    const columns2 = renderer.create((<Columns gap={8} mobile={{gap: 1}}/>));
    const columns3 = renderer.create((<Columns gap={0}/>));

    expect(columns1.toJSON()).toMatchSnapshot();
    expect(columns2.toJSON()).toMatchSnapshot();
    expect(columns3.toJSON()).toMatchSnapshot();
});
