import * as React from "react";
import {calcClasses} from "../../helpers";
import {MessageContentOptions, MessageContentProps} from "./props";

export const MessageContent: React.FunctionComponent<MessageContentProps> = (props) => (
    <div className={calcClasses(props, MessageContentOptions)}>
        {props.children}
    </div>
);
