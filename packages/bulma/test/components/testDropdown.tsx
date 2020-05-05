import * as React from "react";
import * as renderer from "react-test-renderer";
import {Button, Dropdown, DropdownDivider, DropdownElement} from "../../src";

test("Dropdown", () => {
    const element1 = renderer.create((
        <Dropdown hoverable up button={<Button>Button</Button>}>
            <DropdownElement active>
                <a href={"#"}>Element 1</a>
            </DropdownElement>
            <DropdownDivider/>
            <DropdownElement>
                <span>A short description</span>
            </DropdownElement>
        </Dropdown>
    ));

    expect(element1.toJSON()).toMatchSnapshot();
});
