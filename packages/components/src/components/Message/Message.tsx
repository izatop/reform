import * as React from "react";
import {Helpers} from "../../helpers";
import {MessageOptions, MessageProps} from "./props";

export const Message: React.FunctionComponent<MessageProps> = (props) => (
    <article className={Helpers.calcClasses(props, MessageOptions)}>
        {props.children}
    </article>
);

Message.displayName = "Message";
