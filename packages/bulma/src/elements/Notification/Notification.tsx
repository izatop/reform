import * as React from "react";
import {XProps} from "../../interfaces";
import {ColorType} from "../../options";
import {MakeProps} from "../../type";
import {ElementFactory} from "../../utils";

export interface INotification {
    "is-color"?: ColorType;
}

const config = ElementFactory.create({component: "notification"});

export const Notification = config.factory<MakeProps<INotification>, XProps<"div">>(({props, children}) => (
    <div {...props}>{children}</div>
));
