import * as React from "react";
import * as renderer from "react-test-renderer";
import {TableFactory} from "../../../src";

test("TableFactory", () => {
    const data = [
        {id: 1, f1: 76, f2: "Text 1"},
        {id: 2, f1: 98, f2: "Text 2"},
    ];

    const Table = TableFactory.create<typeof data[0]>();

    const element = (
        <Table.Factory data={data}>
            <Table.Config primary={"id"} rowProps={({id}) => (id === 2 ? {selected: true} : {})}>
                <Table.Property key={"f1"} name={"f1"} align={"right"}/>
                <Table.Property key={"f2"} name={"f2"} total={() => "total"}>
                    {({id, f2}) => (<span>Hello, {f2} ({id})</span>)}
                </Table.Property>
            </Table.Config>
            <Table.Renderer footer/>
        </Table.Factory>
    );

    expect(renderer.create(element).toJSON())
        .toMatchSnapshot();
});
