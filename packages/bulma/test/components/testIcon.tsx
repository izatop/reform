import * as React from "react";
import * as renderer from "react-test-renderer";
import {Size} from "../../src";
import {Icon} from "../../src/elements/Icon";

test("Icon", () => {
    const element1 = renderer.create((
        <Icon icon={"home"}
              is-size={Size.Medium}
              icon-flip={"v"}
              icon-rotate={90}
              icon-weight={"lg"}/>
    ));

    expect(element1.toJSON()).toMatchSnapshot();
});
