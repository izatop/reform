import * as React from "react";
import {calcClasses} from "../../helpers";
import {NotificationOptions, NotificationProps} from "./props";

export const Notification: React.FunctionComponent<NotificationProps> = (props) => (
    <div className={calcClasses(props, NotificationOptions)}>
        {props.children}
    </div>
);
