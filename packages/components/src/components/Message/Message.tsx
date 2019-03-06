import * as React from "react";
import {calcClasses} from "../../helpers";
import {MessageOptions, MessageProps} from "./props";

export const Message: React.FunctionComponent<MessageProps> = (props) => (
    <article className={calcClasses(props, MessageOptions)}>
        {props.children}
    </article>
);
