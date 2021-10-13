import {ConfigFactory} from "../../utils";

const config = ConfigFactory.create({component: "message-body"});
export const MessageContent = config.factory(({props, children}) => (
    <div {...props}>{children}</div>
));
