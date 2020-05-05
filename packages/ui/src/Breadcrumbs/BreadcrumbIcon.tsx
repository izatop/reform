import {Icon} from "@reform/bulma";
import * as React from "react";

interface BreadcrumbIconProps {
    icon?: string | React.ReactElement;
}

export const BreadcrumbIcon: React.FC<BreadcrumbIconProps> = ({icon}) => {
    if (!icon) {
        return null;
    }

    if (typeof icon === "string") {
        return <Icon icon={icon}/>;
    }

    return icon;
};
