import {MakeProps, XProps} from "../../interfaces";
import {ConfigFactory} from "../../utils";

const config = ConfigFactory.create({component: "media"});
export const Media = config.factory<MakeProps, XProps<"article">>(({props, children}) => (
    <article {...props}>{children}</article>
));
