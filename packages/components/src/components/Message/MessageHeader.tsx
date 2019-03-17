import * as React from "react";
import {Helpers} from "../../helpers";
import {MessageHeaderOptions, MessageHeaderProps} from "./props";

export const MessageHeader: React.FunctionComponent<MessageHeaderProps> = (props) => (
    <div className={Helpers.calcClasses(props, MessageHeaderOptions)}>
        {props.children}
    </div>
);

MessageHeader.displayName = "MessageHeader";
