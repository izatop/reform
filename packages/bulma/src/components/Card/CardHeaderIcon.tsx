import * as React from "react";
import {Icon} from "../../elements/Icon";
import {XProps} from "../../interfaces";
import {MakeProps} from "../../type";
import {ElementFactory} from "../../utils";

export interface ICardHeaderIcon {
    icon?: React.ReactElement | string;
}

const config = ElementFactory.create({component: "card-header-icon"});

export const CardHeaderIcon = config.factory<MakeProps, XProps<"a"> & ICardHeaderIcon>(({props: {icon, ...p}}) => (
    <a aria-label="more options" {...p}>
        {React.isValidElement(icon) ? icon : <Icon icon={icon as string}/>}
    </a>
));
