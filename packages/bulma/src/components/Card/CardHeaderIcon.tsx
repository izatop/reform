import {isValidElement} from "react";
import {Icon} from "../../elements";
import {MakeProps, XProps} from "../../interfaces";
import {ConfigFactory} from "../../utils";

export interface ICardHeaderIcon {
    icon?: string;
}

const config = ConfigFactory.create({component: "card-header-icon"});

export const CardHeaderIcon = config.factory<MakeProps, XProps<"a"> & ICardHeaderIcon>(({props: {icon, ...p}}) => (
    <a aria-label="more options" {...p}>
        {isValidElement(icon) ? icon : <Icon icon={icon}/>}
    </a>
));
