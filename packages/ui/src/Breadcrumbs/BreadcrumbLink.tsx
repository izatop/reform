import {Icon} from "@reform/bulma";
import * as React from "react";

interface BreadcrumbIconProps {
    icon?: string | React.ReactElement;
    title: string | React.ReactElement;
}

export const BreadcrumbLink: React.FC<BreadcrumbIconProps> = ({icon, title}) => {
    if (!icon) {
        return <>{title}</>;
    }

    if (typeof icon === "string") {
        return <><Icon icon={icon}/><span>{title}</span></>;
    }

    return <>{icon}<span>{title}</span></>;
};
