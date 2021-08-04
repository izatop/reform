import * as React from "react";
import * as renderer from "react-test-renderer";
import {Breadcrumbs, BreadcrumbsProvider} from "../../../../src/Breadcrumbs";

test("Non ideal state", () => {
    const body = (
        <BreadcrumbsProvider base={[["/", "Home", "icon"], ["/me", "User"]]}>
            <Breadcrumbs/>
        </BreadcrumbsProvider>
    );

    expect(renderer.create(body).toJSON())
        .toMatchSnapshot();
});
