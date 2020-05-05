import * as React from "react";
import {ElementFactory} from "../../utils";

const config = ElementFactory.create({component: "message-header"});
export const MessageHeader = config.factory(({props, children}) => (
    <div {...props}>{children}</div>
));
