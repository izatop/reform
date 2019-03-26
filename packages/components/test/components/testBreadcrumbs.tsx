import * as React from "react";
import * as renderer from "react-test-renderer";
import {Breadcrumbs} from "../../src/components/Breadcrumbs";
import {Icon} from "../../src/elements/Icon";

test("Breadcrumbs", () => {
    const element1 = renderer.create(<Breadcrumbs has-style={"dot"}
                                                  paths={[["/", "Home", "home"], ["/path", "Path"]]}/>);
    expect(element1.toJSON()).toMatchSnapshot();

    const element2 = renderer.create((
        <Breadcrumbs is-centered>
            <Icon icon={"home"}><a href={"/"}>Home</a></Icon>
            <a href={"/path"}>Path</a>
        </Breadcrumbs>
    ));

    expect(element2.toJSON()).toMatchSnapshot();
});
