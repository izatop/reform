import * as React from "react";
import {calcClasses} from "../../helpers";
import {MessageHeaderOptions, MessageHeaderProps} from "./props";

export const MessageHeader: React.FunctionComponent<MessageHeaderProps> = (props) => (
    <div className={calcClasses(props, MessageHeaderOptions)}>
        {props.children}
    </div>
);
