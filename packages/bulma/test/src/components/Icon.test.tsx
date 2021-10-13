import * as renderer from "react-test-renderer";
import {Size} from "../../../src";
import {Icon} from "../../../src/elements/Icon";

test("Icon", () => {
    const icon = {
        name: "home",
        flip: "v",
        rotate: 90,
        weight: "lg",
    };

    const element1 = renderer.create((<Icon icon={icon} size={Size.Medium}/>));
    expect(element1.toJSON()).toMatchSnapshot();
});
