import {MakeProps, XProps} from "../../interfaces";
import {ConfigFactory} from "../../utils";

const config = ConfigFactory.create({component: "card-header-title"});
export const CardHeaderTitle = config.factory<MakeProps, XProps<"p">>(({props, children}) => (
    <p {...props}>{children}</p>
));
