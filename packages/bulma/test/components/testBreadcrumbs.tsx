import * as React from "react";
import * as renderer from "react-test-renderer";
import {Breadcrumbs} from "../../src/components/Breadcrumbs";
import {Icon} from "../../src/elements/Icon";

test("Breadcrumbs", () => {
    const paths = [["/", "Home", "home"], ["/path", "Path"]];
    const element1 = renderer.create(<Breadcrumbs separator={"dot"} paths={paths}/>);
    expect(element1.toJSON()).toMatchSnapshot();

    const element2 = renderer.create((
        <Breadcrumbs centered>
            <Icon icon={"home"}><a href={"/"}>Home</a></Icon>
            <a href={"/path"}>Path</a>
        </Breadcrumbs>
    ));

    expect(element2.toJSON()).toMatchSnapshot();
});
