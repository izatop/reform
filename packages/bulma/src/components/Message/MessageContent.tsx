import * as React from "react";
import {ElementFactory} from "../../utils";

const config = ElementFactory.create({component: "message-body"});

export const MessageContent = config.factory(({props, children}) => (
    <div {...props}>{children}</div>
));
