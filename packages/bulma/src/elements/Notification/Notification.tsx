import * as React from "react";
import {XProps} from "../../interfaces";
import {IsColor} from "../../props";
import {MakeProps} from "../../type";
import {ConfigFactory} from "../../utils";

const config = ConfigFactory.create({component: "notification"});
export const Notification = config.factory<MakeProps<IsColor>, XProps<"div">>(({props, children}) => (
    <div {...props}>{children}</div>
));
