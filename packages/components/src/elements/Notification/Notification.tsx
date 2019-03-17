import * as React from "react";
import {Helpers} from "../../helpers";
import {NotificationOptions, NotificationProps} from "./props";

export const Notification: React.FunctionComponent<NotificationProps> = (props) => (
    <div className={Helpers.calcClasses(props, NotificationOptions)}>
        {props.children}
    </div>
);

Notification.displayName = "Notification";
