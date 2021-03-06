import * as React from "react";
import {Icon} from "../../elements/Icon";
import {MakeProps, XProps} from "../../interfaces";
import {ConfigFactory} from "../../utils";

export interface ICardHeaderIcon {
    icon?: string;
}

const config = ConfigFactory.create({component: "card-header-icon"});

export const CardHeaderIcon = config.factory<MakeProps, XProps<"a"> & ICardHeaderIcon>(({props: {icon, ...p}}) => (
    <a aria-label="more options" {...p}>
        {React.isValidElement(icon) ? icon : <Icon icon={icon}/>}
    </a>
));
