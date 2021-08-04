import * as React from "react";
import * as renderer from "react-test-renderer";
import {Level, LevelElement, LevelLeft, LevelRight} from "../../../src";

test("Level", () => {
    const element1 = renderer.create((
        <Level>
            <LevelLeft>
                <LevelElement hasTextCentered>Foo</LevelElement>
            </LevelLeft>
            <LevelRight>
                <LevelElement>Bar</LevelElement>
                <LevelElement>Baz</LevelElement>
            </LevelRight>
        </Level>
    ));

    expect(element1.toJSON()).toMatchSnapshot();

    const element2 = renderer.create((
        <Level>
            <LevelElement>Foo</LevelElement>
            <LevelElement>Bar</LevelElement>
        </Level>
    ));

    expect(element2.toJSON()).toMatchSnapshot();
});
