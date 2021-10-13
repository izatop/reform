import {MakeProps, XProps} from "../interfaces";
import {ConfigFactory} from "../utils";

const config = ConfigFactory.create({component: "box"});
export const Box = config.factory<MakeProps, XProps<"div">>(({props, children}) => {
    return <div {...props}>{children}</div>;
});
