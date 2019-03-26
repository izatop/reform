import * as React from "react";
import {ColorType} from "../../options";
import {MakeProps} from "../../type";
import {ElementFactory} from "../../utils";

export interface INotification {
    "is-color"?: ColorType;
}

const config = ElementFactory.create({component: "notification"});

export const Notification = config.factory<MakeProps<INotification>>(({props, children}) => (
    <div {...props}>{children}</div>
));
