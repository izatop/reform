import {MakeProps, XProps} from "../../interfaces";
import {IsColor} from "../../props";
import {ConfigFactory} from "../../utils";

const config = ConfigFactory.create({component: "notification"});
export const Notification = config.factory<MakeProps<IsColor>, XProps<"div">>(({props, children}) => (
    <div {...props}>{children}</div>
));
