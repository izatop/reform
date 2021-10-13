import {ConfigFactory} from "../../utils";

const config = ConfigFactory.create({component: "message-header"});
export const MessageHeader = config.factory(({props, children}) => (
    <div {...props}>{children}</div>
));
