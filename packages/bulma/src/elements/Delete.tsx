import {MakeProps, XProps} from "../interfaces";
import {IsSize} from "../props";
import {ConfigFactory} from "../utils";

const config = ConfigFactory.create({component: "delete"});
export const Delete = config.factory<MakeProps<IsSize>, XProps<"a">>(({props, children}) => {
    return <a {...props}>{children}</a>;
});
