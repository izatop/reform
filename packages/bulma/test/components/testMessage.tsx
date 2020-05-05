import * as React from "react";
import * as renderer from "react-test-renderer";
import {Message, MessageContent, MessageHeader} from "../../src";

test("Message", () => {
    const element1 = renderer.create((
        <Message>
            <MessageHeader>Header</MessageHeader>
            <MessageContent>Content</MessageContent>
        </Message>
    ));

    expect(element1.toJSON()).toMatchSnapshot();

    const element2 = renderer.create((
        <Message size={"small"} color={"primary"}>
            <MessageHeader>Header</MessageHeader>
            <MessageContent>Content</MessageContent>
        </Message>
    ));

    expect(element2.toJSON()).toMatchSnapshot();
});
