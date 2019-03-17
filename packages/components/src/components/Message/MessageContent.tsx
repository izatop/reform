import * as React from "react";
import {Helpers} from "../../helpers";
import {MessageContentOptions, MessageContentProps} from "./props";

export const MessageContent: React.FunctionComponent<MessageContentProps> = (props) => (
    <div className={Helpers.calcClasses(props, MessageContentOptions)}>
        {props.children}
    </div>
);

MessageContent.displayName = "MessageContent";
