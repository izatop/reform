import {MakeProps, XProps} from "../../interfaces";
import {AreSizes} from "../../props";
import {ConfigFactory} from "../../utils";

interface IButtons extends AreSizes {
    addons?: boolean;
    centered?: boolean;
    right?: boolean;
}

const config = ConfigFactory.create({component: "buttons"});
export const Buttons = config.factory<MakeProps<IButtons>, XProps<"div">>(({props, children}) => (
    <div {...props}>{children}</div>
));
